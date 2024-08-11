import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateAccountDetails,
    getdepartment
} from "../controllers/user.controllers.js";


import { 
    createIssue,
    getissue,
    updateResponses,
    getIssueforuser,
    sendReportToAdmin
} from "../controllers/issue.controllers.js";

import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/raise-issue").post(verifyJWT,createIssue)
router.route("/get-department").get(verifyJWT,getdepartment)
router.route("/get-issue").get(verifyJWT,getissue)
router.route("/get-issue-for-user").get(verifyJWT,getIssueforuser)
router.route("/update-response").put(verifyJWT,updateResponses)
router.route("/send-report").get(verifyJWT,sendReportToAdmin)
export default router