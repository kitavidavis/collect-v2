const Dashboard = require("../models/dashboard");

export function createDashboard(obj) {
    return new Promise((resolve, reject) => {
        let newDashboard = new Dashboard({
            username: obj.username,
            form_id: obj.form_id,
            title: obj.title,
            description: obj.description,
            header: obj.header,
            nav: obj.nav,
            headerLinks: obj.headerLinks,
            footer: obj.footer,
            nav2: obj.nav2,
            footerLinks: obj.footerLinks,
            charts: obj.charts,
            statistics: obj.statistics,
            viewPublic: obj.viewPublic,
            dashboardId: obj.dashboardId
        });

        Dashboard.createDashboard(newDashboard, function(err, dashboard) {
            if(err){
                reject(err);
            }

            resolve(dashboard);
        })
    })
}

export async function findSpecificUserDashboards({ username }) {
    return new Promise((resolve, reject) => {
        Dashboard.getDashboardsByUsername(username, function(err, dashboards) {
            if(err){
                reject(err);
            }

            resolve(dashboards);
        })
    })
}

export async function findSpecificDashboard({ dashboardId }) {
    return new Promise((resolve, reject) => {
        Dashboard.getDashboardByDashboardId(dashboardId, function(err, dashboard) {
            if(err){
                reject(err);
            }

            resolve(dashboard);
        })
    })
}

export async function deleteSpecificDashboard({ dashboardId }) {
    return new Promise((resolve, reject) => {
        Dashboard.deleteDashboard(dashboardId, function(err, done) {
            if(err){
                reject(err);
            }

            resolve(done);
        })
    })
}

export async function deleteAllUserDashboards({ username }){
    return new Promise((resolve, reject) => {
        Dashboard.deleteAllUserDashboards(username, function(err, isDone) {
            if(err){
                reject(err);
            }

            resolve(isDone);
        })
    })
}

export async function makeDashboardPublic({ dashboardId }){
    return new Promise((resolve, reject) => {
        Dashboard.makePublic(dashboardId, function(err, isDone){
            if(err){
                reject(err);
            }

            resolve(isDone);
        })
    })
}

export async function makeDashboardPrivate({ dashboardId }) {
    return new Promise((resolve, reject) => {
        Dashboard.makePrivate(dashboardId, function(err, isDone) {
            if(err){
                reject(err);
            }

            resolve(isDone);
        })
    })
}

export async function getAllPublicDashboards(){
    return new Promise((resolve, reject) => {
        Dashboard.getAllPublicDashboards(function(err, dashboards){
            if(err){
                reject(err);
            }

            resolve(dashboards);
        })
    })
}