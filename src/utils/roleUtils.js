export const hasAccess = (userRole, allowedRoles) => {
    return allowedRoles.includes(userRole);
  };
  
  export const getRoleLabel = (role) => {
    switch (role) {
      case "Admin":
        return "Administrator";
      case "Inspector":
        return "Ship Inspector";
      case "Engineer":
        return "Engineer";
      default:
        return "Unknown Role";
    }
  };
  