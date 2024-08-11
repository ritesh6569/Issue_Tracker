import { Issue } from "../models/issueRaise.models.js";
import { User } from "../models/user.models.js";
import {sendEmail} from "../utils/emailService.js"
import { Response } from "../models/response.models.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createIssue = asyncHandler(async (req,res)=>{
    const {issue,description,address,requireDepartment} = req.body
    console.log(req.body)
    if (
        [issue,address,requireDepartment].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const availableUser = await User.findOne({ department: requireDepartment });

    if (!availableUser) {
        throw new ApiError(401, "Required Department is not available");
    }
    console.log("Request id  : ",req.user.id)
    const task = await Issue.create({
        issue,
        description,
        address,
        requireDepartment,
        userId: req.user._id
    })
    await task.save();

    
    // Send email to the user
    const subject = 'New Issue Assigned';
    const text = `Dear ${availableUser.fullName},

You have been assigned a new issue:

Issue: ${issue}
Description: ${description}
Address: ${address}

Please address this issue as soon as possible.

Thank you,
UAIMS HR`;

    await sendEmail(availableUser.email, subject, text);
 
    const response = await Response.create({ 
        issueId: task._id
    });
    await response.save();

    return res
    .status(200)
    .json(new ApiResponse(200,{task,response},"Issue is created successfully"))
})

const getissue = asyncHandler(async (req,res)=>{
    const dep = req.user.department
    console.log("Department : ",dep);
    

    const issues = await Issue.find({requireDepartment : dep})

    console.log("Issues  :  ",issues);
    
    return res
    .status(200)
    .json(new ApiResponse(201,issues,"issues fetched successfully"))
})

// const updateRespones = asyncHandler(async (req,res) => {
//     const {description,requirements,actionTaken,complete} = req.body
    

//     const dep = req.user.department

//     const problem = await Issue.find({requireDepartment : dep})
//     const id = problem._id
//     console.log("Problem id : ",id);
    

//     const findRes = await Response.find({issueId : id})
//     const resid = findRes._id
//     console.log("Response id : ",resid);
    
//     const upRes = await Response.findByIdAndUpdate(
//         resid,
//         {
//             $set: {
//                 description:description,
//                 requirements,
//                 actionTaken,
//                 complete
//             }
//         },
//         {new : true}
//     )
        
    
//         return res
//         .status(200)
//         .json(new ApiResponse(200,resid,"Response updated successfully!!"))
// })


const updateResponses = asyncHandler(async (req, res) => {
    const { description, requirements, actionTaken, complete } = req.body;

    const dep = req.user.department;

    // Find the issues for the user's department
    const issues = await Issue.find({ requireDepartment: dep });

    // Check if any issues were found
    if (issues.length === 0) {
        throw new ApiError(404, "No issues found for the department");
    }

    // Iterate over the issues to update responses
    let updatedResponses = [];
    for (let issue of issues) {
        const id = issue._id;

        // Find the response for the issue
        const response = await Response.findOne({ issueId: id });
        if (response) {
            const resid = response._id;

            // Update the response
            const updatedResponse = await Response.findByIdAndUpdate(
                resid,
                {
                    $set: {
                        description,
                        requirements,
                        actionTaken,
                        complete,
                    },
                },
                { new: true }
            );

            if (updatedResponse) {
                updatedResponses.push(updatedResponse);
            }
        }
    }

    if (updatedResponses.length === 0) {
        throw new ApiError(404, "No responses found to update");
    }

    return res.status(200).json(new ApiResponse(200, updatedResponses, "Responses updated successfully!"));
});

const getIssueforuser = asyncHandler(async (req,res)=>{
    const getuser = req.user._id
    const findproblems = await Issue.find({userId:getuser})
    return res
    .status(200)
    .json(new ApiResponse(201,findproblems,"problem is fetched successfully to users"))
})

// const sendReportToAdmin = asyncHandler(async (req,res)=>{
//     const userid = req.user._id

//     const findproblems = await Issue.find({userId:userid})
//     const findresponse = await Response.find({issueId:findproblems._id})

//     console.log("Problem : ",findproblems)
//     console.log("Response : ",findresponse);

//     return res
//     .status(200)
//     .json(new ApiResponse(201,{findproblems,findresponse},"Summary sent succeessfully"))
    
// })

const sendReportToAdmin = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    console.log("User ID: ", userId); // Log the user ID for debugging

    // Find all issues created by the user
    const findProblems = await Issue.find({ userId:userId });

    // Log the issues found
    console.log("Found Issues: ", findProblems);

    // If no issues are found, return an appropriate message
    if (findProblems.length === 0) {
        return res.status(404).json(new ApiResponse(404, {}, "No issues found for this user"));
    }

    // Extract issue IDs
    const issueIds = findProblems.map(issue => issue._id);
    
    // Find all responses corresponding to the issues
    const findResponses = await Response.find({ issueId: { $in: issueIds } });

    // Log the responses found
    console.log("Found Responses: ", findResponses);

    return res.status(200).json(new ApiResponse(200, { findProblems, findResponses }, "Summary sent successfully"));
});






export {
    createIssue,
    getissue,
    getIssueforuser,
    updateResponses,
    sendReportToAdmin
}