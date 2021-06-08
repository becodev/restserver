const { response, request } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "You are trying to validate role before validating token",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} does not have Admin role. ${name} can not do this.`,
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "You are trying to validate role before validating token",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The service requires at least one of these roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
