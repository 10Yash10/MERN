import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    normalizedUrl: {
      type: String,
      required: true,
    },
    customAlias: {
      type: String,
      default: null,
      trim: true,
    },
    isCustomAlias: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    totalClicks: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    qrMeta: {
      enabled: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: "#000000",
      },
    },
    createdByIpHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// =============== Index Strategies =================

// 1. unique and sparse indexes for custom alias
urlSchema.index({ customAlias: 1 }, { unique: true, sparse: true });

// 2. TTL index for clean up after the expiredAt time has reached without using cron job
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// 3. compound lookup optimizations for query performance
urlSchema.index({ shortCode: 1, createdAt: -1 });

export const Url = mongoose.model("Urls", urlSchema);
