import mongoose, { Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface IUser extends Document {
  userType: 'tenant' | 'owner' | 'financing' | 'insurance' | 'sustainability' | 'investor' | 'admin';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationalId: string;
  dateOfBirth: Date;
  
  // Address
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Authentication
  password: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  
  // Profile
  profileImage?: string;
  bio?: string;
  
  // Status
  isActive: boolean;
  isVerified: boolean;
  isSuspended: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  
  // Role-specific data
  tenantData?: {
    employmentStatus: string;
    employerName: string;
    monthlyIncome: number;
    creditScore: number;
    workExperienceYears: number;
  };
  
  ownerData?: {
    companyName: string;
    companyRegistration: string;
    taxId: string;
    bankDetails: {
      accountName: string;
      accountNumber: string;
      bankCode: string;
      iban: string;
    };
  };
  
  financePartnerData?: {
    institutionName: string;
    licenseNumber: string;
    apiKey: string;
    contactPerson: string;
    apiEndpoint: string;
  };
  
  // Methods
  comparePassword(password: string): Promise<boolean>;
  getFullName(): string;
}

const UserSchema = new Schema<IUser>(
  {
    userType: {
      type: String,
      enum: ['tenant', 'owner', 'financing', 'insurance', 'sustainability', 'investor', 'admin'],
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: 'SA' },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    profileImage: String,
    bio: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    tenantData: {
      employmentStatus: String,
      employerName: String,
      monthlyIncome: Number,
      creditScore: Number,
      workExperienceYears: Number,
    },
    ownerData: {
      companyName: String,
      companyRegistration: String,
      taxId: String,
      bankDetails: {
        accountName: String,
        accountNumber: String,
        bankCode: String,
        iban: String,
      },
    },
    financePartnerData: {
      institutionName: String,
      licenseNumber: String,
      apiKey: String,
      contactPerson: String,
      apiEndpoint: String,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Index for queries
UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 });
UserSchema.index({ userType: 1 });
UserSchema.index({ createdAt: -1 });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcryptjs.compare(password, this.password);
};

// Get full name
UserSchema.methods.getFullName = function (): string {
  return `${this.firstName} ${this.lastName}`;
};

export default mongoose.model<IUser>('User', UserSchema);
