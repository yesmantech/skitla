export const trackEvent = (eventName: string, payload?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    console.log(`[Analytics] ${eventName}`, payload);
    // In a real app, this would send data to GA4/Mixpanel/etc.
  }
};
