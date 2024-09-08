// This file is auto-generated by @hey-api/openapi-ts

export const $EmailChange = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      maxLength: 255,
    },
  },
  required: ["email"],
} as const;

export const $Login = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      maxLength: 255,
    },
    password: {
      type: "string",
      maxLength: 128,
    },
  },
  required: ["email", "password"],
} as const;

export const $Message = {
  type: "object",
  properties: {
    message: {
      type: "string",
    },
  },
  required: ["message"],
} as const;

export const $PaginatedTaskList = {
  type: "object",
  required: ["count", "results"],
  properties: {
    count: {
      type: "integer",
      example: 123,
    },
    next: {
      type: "string",
      nullable: true,
      format: "uri",
      example: "http://api.example.org/accounts/?offset=400&limit=100",
    },
    previous: {
      type: "string",
      nullable: true,
      format: "uri",
      example: "http://api.example.org/accounts/?offset=200&limit=100",
    },
    results: {
      type: "array",
      items: {
        $ref: "#/components/schemas/Task",
      },
    },
  },
} as const;

export const $PaginatedUserList = {
  type: "object",
  required: ["count", "results"],
  properties: {
    count: {
      type: "integer",
      example: 123,
    },
    next: {
      type: "string",
      nullable: true,
      format: "uri",
      example: "http://api.example.org/accounts/?offset=400&limit=100",
    },
    previous: {
      type: "string",
      nullable: true,
      format: "uri",
      example: "http://api.example.org/accounts/?offset=200&limit=100",
    },
    results: {
      type: "array",
      items: {
        $ref: "#/components/schemas/User",
      },
    },
  },
} as const;

export const $PasswordChange = {
  type: "object",
  properties: {
    password: {
      type: "string",
      maxLength: 128,
    },
  },
  required: ["password"],
} as const;

export const $PasswordReset = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      maxLength: 255,
    },
  },
  required: ["email"],
} as const;

export const $PasswordResetVerified = {
  type: "object",
  properties: {
    code: {
      type: "string",
      maxLength: 40,
    },
    password: {
      type: "string",
      maxLength: 128,
    },
  },
  required: ["code", "password"],
} as const;

export const $PatchedTask = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      readOnly: true,
    },
    title: {
      type: "string",
      maxLength: 255,
    },
    description: {
      type: "string",
      nullable: true,
    },
    completed: {
      type: "boolean",
    },
    created_at: {
      type: "string",
      format: "date-time",
      readOnly: true,
    },
    updated_at: {
      type: "string",
      format: "date-time",
      readOnly: true,
    },
  },
} as const;

export const $PatchedUser = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      readOnly: true,
    },
    email: {
      type: "string",
      format: "email",
      title: "Email address",
      maxLength: 255,
    },
    is_active: {
      type: "boolean",
      title: "Active",
      description:
        "Designates whether this user should be treated as active.  Unselect this instead of deleting accounts.",
    },
    is_staff: {
      type: "boolean",
      title: "Staff status",
      description: "Designates whether the user can log into this admin site.",
    },
    is_superuser: {
      type: "boolean",
      title: "Superuser status",
      description:
        "Designates that this user has all permissions without explicitly assigning them.",
    },
  },
} as const;

export const $Signup = {
  type: "object",
  description: `Don't require email to be unique so visitor can signup multiple times,
if misplace verification email.  Handle in view.`,
  properties: {
    email: {
      type: "string",
      format: "email",
      maxLength: 255,
    },
    password: {
      type: "string",
      maxLength: 128,
    },
    first_name: {
      type: "string",
      default: "",
      maxLength: 30,
    },
    last_name: {
      type: "string",
      default: "",
      maxLength: 30,
    },
  },
  required: ["email", "password"],
} as const;

export const $Task = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      readOnly: true,
    },
    title: {
      type: "string",
      maxLength: 255,
    },
    description: {
      type: "string",
      nullable: true,
    },
    completed: {
      type: "boolean",
    },
    created_at: {
      type: "string",
      format: "date-time",
      readOnly: true,
    },
    updated_at: {
      type: "string",
      format: "date-time",
      readOnly: true,
    },
  },
  required: ["created_at", "id", "title", "updated_at"],
} as const;

export const $User = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      readOnly: true,
    },
    email: {
      type: "string",
      format: "email",
      title: "Email address",
      maxLength: 255,
    },
    first_name: {
      type: "string",
      maxLength: 30,
    },
    last_name: {
      type: "string",
      maxLength: 30,
    },
  },
  required: ["email", "id"],
} as const;
