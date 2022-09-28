var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => console.log("MongoDB Connected"))

var DashboardSchema = mongoose.Schema({
    username: {
        type: String
    },
    form_id: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    header: {
        type: Boolean,
        default: true
    },
    nav: {
        type: Boolean
    },
    headerLinks: {
        type: Object
    },
    footer: {
        type: Boolean,
        default: true
    },
    nav2: {
        type: Boolean
    },
    footerLinks: {
        type: Object
    },
    charts: {
        type: Boolean,
        default: true
    },
    statistics: {
        type: Boolean,
        default: true
    },
    viewPublic: {
        type: Boolean,
        default: true
    },
    dashboardId: {
        type: String,
        index: true
    }
}, { timestamps: true });

var Dashboard = module.exports = mongoose.models.dashboards || mongoose.model('dashboards', DashboardSchema);

module.exports.createDashboard = function(newDashboard, cb) {
    newDashboard.save(cb);
};

module.exports.getDashboardByDashboardId = function(dashboardId, cb) {
    var query = { dashboardId: dashboardId };
    Dashboard.findOne(query, cb);
};

module.exports.getDashboardsByUsername = function(username, cb){
    var query = { username: username};
    Dashboard.find(query, cb);
}

module.exports.deleteDashboard = function(dashboardId, cb){
    var query = { dashboardId: dashboardId };
    Dashboard.deleteOne(query, cb);
}

module.exports.deleteAllUserDashboards = function(username, cb) {
    var query = { username: username };
    Dashboard.deleteMany(query, cb);
}

module.exports.makePublic = function(dashboardId, cb) {
    Dashboard.getDashboardByDashboardId(dashboardId, function(err, dashboard) {
        if(err) throw err;

        dashboard.viewPublic = true;
        dashboard.save(cb);
    })
}

module.exports.makePrivate = function(dashboardId, cb) {
    Dashboard.getDashboardByDashboardId(dashboardId, function(err, dashboard){
        if(err) throw err;

        dashboard.active = false;
        dashboard.save(cb);
    })
}

module.exports.getAllPublicDashboards = function(cb){
    var query = { viewPublic: true };
    Dashboard.find(query, cb);
}