const Paths = {

    // USER
    signin: "/auth/sign-in",
    selectRole: "/auth/sign-up",
    // signup: "/auth/sign-up/:roleId",

    // RECRUITER
    clientHome: "/",
    clientEvent: "/event",
    clientFindJobs: "/find-jobs",
    clientDashboard: "/me/dashboard",
    clientProfile: "/me/profile",
    clientAccount: "/me/account",

    // STUDENT
    recruiterHome: "/recruiter",
    recruiterEvent: "/recruiter/event",
    recruiterFindCandidates: "/recruiter/find-candidates",
    recruiterDashboard: "/recruiter/me/dashboard",
    recruiterProfile: "/recruiter/me/profile",
    recruiterAccount: "/recruiter/me/account",
    recruiterCandidate: "/recruiter/candidate",

    // ADMIN
    adminDashboard: "/admin",
    adminSignIn: "/admin/auth/admin-sign-in",
    adminVerification: "/admin/verification"
}

export default Paths;