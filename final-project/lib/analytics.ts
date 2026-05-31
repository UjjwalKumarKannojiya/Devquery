
import posthog from 'posthog-js';

export type EventType = 
  | 'page_view'
  | 'question_created'
  | 'question_viewed'
  | 'answer_created'
  | 'answer_voted'
  | 'user_signup'
  | 'user_login'
  | 'search_performed';

export interface AnalyticsEvent {
  type: EventType;
  userId?: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

const eventQueue: AnalyticsEvent[] = [];

export function trackEvent(type: EventType, userId?: string, metadata?: Record<string, unknown>) {
  const event: AnalyticsEvent = {
    type,
    userId,
    metadata,
    timestamp: new Date(),
  };

  eventQueue.push(event);

  if (typeof window !== 'undefined') {
    
    posthog.capture(type, {
      user_id: userId,
      ...metadata,
    });
  }

  console.log('Event tracked:', event);
}

export function trackPageView(pageName: string, userId?: string) {
  trackEvent('page_view', userId, { page: pageName });
}

export function getEventQueue() {
  return [...eventQueue];
}

export function clearEventQueue() {
  eventQueue.length = 0;
}

