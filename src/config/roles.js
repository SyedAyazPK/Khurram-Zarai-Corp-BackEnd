const allRoles = {
    superAdmin: ["read", "write", "edit", "delete"],
    admin: ["read", "write", "edit", "delete"],
    user: ["read"],
    dropshipper: [],
    guest: [],
  },
  roles = Object.keys(allRoles),
  roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
