import { MOCK_LIVE_ORDERS, MOCK_LOW_INVENTORY } from "../data/staffMockData";
import { ANALYTICS_BY_RANGE } from "../data/analyticsMockData";

const DELAY_MS = 400;
function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), DELAY_MS));
}

export async function getStaffQueue() {
  return delay(MOCK_LIVE_ORDERS);
}

export async function getLowInventoryAlerts() {
  return delay(MOCK_LOW_INVENTORY);
}

/** @param {'TODAY' | '7D' | '30D'} range */
export async function getAdminAnalytics(range = "TODAY") {
  return delay(ANALYTICS_BY_RANGE[range] ?? ANALYTICS_BY_RANGE.TODAY);
}