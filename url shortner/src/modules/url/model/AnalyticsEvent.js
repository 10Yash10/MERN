import mongoose from "mongoose";

const analyticsEvent = new mongoose.Schema({
  shortCode: {
    type: String,
    required: true,
  },
  visitorsHash: {
    type: String,
    required: true,
  },
  ipHash: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
  },
  referrer: {
    type: String,
    default: "Direct",
  },
  deviceType: {
    type: String,
    default: "Desktop",
  },
  browser: {
    type: String,
    default: "unknown",
  },
  clickedAt: {
    type: Date,
    default: Date.now,
  },
  isBot: {
    type: Boolean,
    default: false,
  },
});

// ================= Index Strategies ==============

// 1. compounded lookup optimzation for query optimizations.
analyticsEvent.index({ shortCode: 1, clickedAt: -1 });

export const AnalyticsEvent = mongoose.model("AnalyticsEvent", analyticsEvent);
