export const createUserValidationSchemas = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "the length should be between 5 to 32",
    },
    notEmpty: { errorMessage: "Username Cannot Be Empty" },
    isString: { errorMessage: "Username Should Be A String" },
  },
  anonname: {
    notEmpty: true,
  },
};
