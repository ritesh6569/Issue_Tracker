import { Issue } from "../models/issueRaise.models.js";
import { User } from "../models/user.models.js";
import {sendEmail} from "../utils/emailService.js"
import { Response } from "../models/response.models.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createIssue = asyncHandler(async (req,res)=>{
    const {issue,description,address,requireDepartment} = req.body

    if (
        [issue,address,requireDepartment].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const availableUser = await User.findOne({ department: requireDepartment });

    if (!availableUser) {
        throw new ApiError(401, "Required Department is not available");
    }
    
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

    await req.user.addProblem(task._id);
    await req.user.addResponse(response._id);


    return res
    .status(200)
    .json(new ApiResponse(200,{task,response},"Issue is created successfully"))
})

const getissue = asyncHandler(async (req,res)=>{
    const dep = req.user.department
    
    const issues = await Issue.find({requireDepartment : dep, complete:false})
    
    return res
    .status(200)
    .json(new ApiResponse(201,issues,"issues fetched successfully"))
})


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
    const findproblems = await Issue.find({ userId: getuser, complete: false });
    

    return res
    .status(200)
    .json(new ApiResponse(201,findproblems,"problem is fetched successfully to users"))
})



const sendReportToAdmin = asyncHandler(async (req, res) => {
    const userId = req.user._id;


    // Find all issues created by the user
    const findProblems = await Issue.find({ userId:userId });


    // If no issues are found, return an appropriate message
    if (findProblems.length === 0) {
        return res.status(404).json(new ApiResponse(404, {}, "No issues found for this user"));
    }

    // Extract issue IDs
    const issueIds = findProblems.map(issue => issue._id);
    
    // Find all responses corresponding to the issues
    const findResponses = await Response.find({ issueId: { $in: issueIds } });

    return res.status(200).json(new ApiResponse(200, { findProblems, findResponses }, "Summary sent successfully"));
});

const completeReport = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { issueId } = req.body; // Get the specific issueId from the request body or params
    // Find the specific issue created by the user
    const findProblem = await Issue.findOne({ _id: issueId, userId });

    if (!findProblem) {
        return res.status(404).json(new ApiResponse(404, {}, "No issue found with the provided ID for this user"));
    }

    // Find all responses corresponding to the issue
    const findResponses = await Response.find({ issueId });

    const currentTime = new Date();

    const day = String(currentTime.getDate()).padStart(2, '0');
    const month = String(currentTime.getMonth() + 1).padStart(2, '0'); 
    const year = currentTime.getFullYear();

    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    // Update the specific issue
    await Issue.updateOne({ _id: issueId }, { complete: true, updatedAt: formattedDateTime });

    // Update corresponding responses
    await Response.updateMany({ issueId }, { complete: true });

    return res.status(200).json(new ApiResponse(200, { findProblem, findResponses }, "Issue marked as complete successfully"));
});


const acknowledgeResponse = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { responseId } = req.body; // Get the specific responseId from the request body or params
    console.log(responseId);
    
    // Find the specific response by the user
    const findResponse = await Response.findOne({ issueId: responseId});

    if (!findResponse) {
        return res.status(404).json(new ApiResponse(404, {}, "No response found with the provided ID for this user"));
    }

    // Get current date and time for the acknowledgment
    const currentTime = new Date();

    const day = String(currentTime.getDate()).padStart(2, '0');
    const month = String(currentTime.getMonth() + 1).padStart(2, '0'); 
    const year = String(currentTime.getFullYear());

    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    // Update the response's acknowledgment time
    await Response.updateOne({ issueId: responseId }, { acknowledge_at: formattedDateTime });

    return res.status(200).json(new ApiResponse(200, { findResponse }, "Response acknowledged successfully"));
});



const fetchReport = asyncHandler(async (req,res)=>{
    const completedProblems = await Issue.find();
    
    return res.status(200).json(new ApiResponse(200, completedProblems, "Completed problems and responses fetched successfully"));
})

const getAdmin = asyncHandler(async (req,res)=>{
    const getdep = req.user.department

    return res
    .status(200)
    .json(new ApiResponse(201,getdep,"department is fetched successfully to users"))
})

export {
    createIssue,
    getissue,
    getIssueforuser,
    updateResponses,
    completeReport,
    acknowledgeResponse,
    fetchReport,
    getAdmin,
}