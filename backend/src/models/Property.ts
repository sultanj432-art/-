import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  ownerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  propertyType: 'apartment' | 'villa' | 'townhouse' | 'studio';
  bedrooms: number;
  bathrooms: number;
  totalArea: number;
  builtUpArea: number;
  
  // Location
  location: {
    address: string;
    city: string;
    district: string;
    coordinates: {
      latitude: number;
      longitude: number;
      type: 'Point';
    };
  };
  
  // Financial
  price: number;
  currency: string;
  downPaymentPercentage: number;
  estimatedMonthlyPayment: number;
  
  // Details
  yearBuilt: number;
  amenities: string[];
  images: Array<{
    url: string;
    isPrimary: boolean;
    uploadedAt: Date;
  }>;
  videos?: string[];
  
  // Quality & Sustainability
  qualityStatus: 'pending' | 'approved' | 'rejected';
  qualityNotes?: string;
  qualityCheckedBy?: mongoose.Types.ObjectId;
  qualityCheckedAt?: Date;
  
  sustainabilityRating: 'gold' | 'silver' | 'bronze' | 'none';
  sustainabilityCertificate?: string;
  sustainabilityCheckedBy?: mongoose.Types.ObjectId;
  sustainabilityCheckedAt?: Date;
  
  insuranceStatus: 'pending' | 'approved' | 'rejected';
  insuranceProvider?: mongoose.Types.ObjectId;
  insurancePremium?: number;
  
  // Status
  status: 'draft' | 'active' | 'sold' | 'inactive';
  isFeatured: boolean;
  views: number;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  soldAt?: Date;
}

const PropertySchema = new Schema<IProperty>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      enum: ['apartment', 'villa', 'townhouse', 'studio'],
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    totalArea: {
      type: Number,
      required: true,
    },
    builtUpArea: {
      type: Number,
      required: true,
    },
    location: {
      address: String,
      city: String,
      district: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'SAR',
    },
    downPaymentPercentage: {
      type: Number,
      default: 20,
    },
    estimatedMonthlyPayment: {
      type: Number,
      required: true,
    },
    yearBuilt: Number,
    amenities: [String],
    images: [
      {
        url: String,
        isPrimary: Boolean,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    videos: [String],
    qualityStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    qualityNotes: String,
    qualityCheckedBy: Schema.Types.ObjectId,
    qualityCheckedAt: Date,
    sustainabilityRating: {
      type: String,
      enum: ['gold', 'silver', 'bronze', 'none'],
      default: 'none',
    },
    sustainabilityCertificate: String,
    sustainabilityCheckedBy: Schema.Types.ObjectId,
    sustainabilityCheckedAt: Date,
    insuranceStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    insuranceProvider: Schema.Types.ObjectId,
    insurancePremium: Number,
    status: {
      type: String,
      enum: ['draft', 'active', 'sold', 'inactive'],
      default: 'draft',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    publishedAt: Date,
    soldAt: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes
PropertySchema.index({ ownerId: 1 });
PropertySchema.index({ status: 1 });
PropertySchema.index({ 'location.coordinates': '2dsphere' });
PropertySchema.index({ createdAt: -1 });
PropertySchema.index({ city: 1, price: 1 });

export default mongoose.model<IProperty>('Property', PropertySchema);
