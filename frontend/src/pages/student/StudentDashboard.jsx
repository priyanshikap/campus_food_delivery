import { useEffect, useState } from 'react';
import OrderStatusTracker from '../../components/OrderStatusTracker';
import StatCard from '../../components/StatCard';
import FoodCard from '../../components/ui/FoodCard';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  mockStudent,
  mockActiveOrder,
  mockTodayPickup,
  mockStats,
  mockRecentOrders,
  mockRecommended,
  mockNotifications,
} from '../../mocks/studentDashboardMock';
import '../../styles/dashboard.css';

const currency = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

function greetingForHour(hour) {
  if (hour < 5) return 'Still up';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

export default function StudentDashboard() {
  // Simulated fetch — swap for real calls to dashboardService / orderService.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(timer);
  }, []);

  const now = new Date();
  const dateLabel = now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="student-dashboard">
      {loading ? (
        <div className="sd-loading-screen">
          <LoadingSpinner label="Plating your dashboard…" />
        </div>
      ) : (
        <>
          {/* Header */}
          <header className="sd-header sd-anim" style={{ '--sd-delay': '0ms' }}>
            <div>
              <p className="sd-eyebrow">{dateLabel}</p>
              <h1 className="sd-greeting">
                {greetingForHour(now.getHours())}, {mockStudent.name.split(' ')[0]} 👋
              </h1>
              <p className="sd-subtext">Here's what's cooking with your CampusBite account.</p>
            </div>
            <div className="sd-header-actions">
              <button type="button" className="sd-icon-btn" aria-label="Notifications">
                🔔
                {unreadCount > 0 && <span className="sd-badge">{unreadCount}</span>}
              </button>
              <button type="button" className="sd-cta">
                Order Food →
              </button>
            </div>
          </header>

          {/* Hero: active order ticket + today's pickup / quick actions */}
          <section className="sd-hero sd-anim" style={{ '--sd-delay': '60ms' }}>
            <div className="sd-ticket-wrap">
              {mockActiveOrder ? (
                <article className="sd-ticket">
                  <div className="sd-ticket-stub">
                    <span className="sd-ticket-eyebrow">Active order</span>
                    <span className="sd-ticket-number">#{mockActiveOrder.id}</span>
                    <span className={`sd-status-pill sd-status-${mockActiveOrder.status.toLowerCase()}`}>
                      {mockActiveOrder.status}
                    </span>
                    <span className="sd-ticket-counter">Counter {mockActiveOrder.counter}</span>
                  </div>
                  <span className="sd-ticket-perf sd-ticket-perf-top" aria-hidden="true" />
                  <span className="sd-ticket-perf sd-ticket-perf-bottom" aria-hidden="true" />
                  <div className="sd-ticket-body">
                    <ul className="sd-ticket-items">
                      {mockActiveOrder.items.map((it) => (
                        <li key={it.name}>
                          <span className="sd-ticket-qty">{it.qty}×</span> {it.name}
                        </li>
                      ))}
                    </ul>
                    <div className="sd-ticket-meta">
                      <span>Placed {mockActiveOrder.placedAt}</span>
                      <span className="sd-dot">·</span>
                      <span>ETA {mockActiveOrder.eta}</span>
                      <span className="sd-dot">·</span>
                      <span>{currency(mockActiveOrder.total)}</span>
                    </div>
                    <OrderStatusTracker status={mockActiveOrder.status} />
                  </div>
                </article>
              ) : (
                <div className="sd-panel">
                  <EmptyState
                    icon="🍽️"
                    title="No active order"
                    message="Hungry? Your next meal is a couple taps away."
                    actionLabel="Order Food"
                  />
                </div>
              )}
            </div>

            <aside className="sd-side-col">
              <div className="sd-panel sd-pickup">
                <h3 className="sd-panel-title">Today's pickup</h3>
                {mockTodayPickup ? (
                  <div className="sd-pickup-body">
                    <span className="sd-pickup-time">{mockTodayPickup.time}</span>
                    <span className="sd-pickup-meta">
                      Counter {mockTodayPickup.counter} · Order #{mockTodayPickup.orderId}
                    </span>
                  </div>
                ) : (
                  <p className="sd-muted">No pickups scheduled today.</p>
                )}
              </div>

              <div className="sd-panel sd-quick-actions">
                <h3 className="sd-panel-title">Quick actions</h3>
                <div className="sd-actions-grid">
                  <button type="button" className="sd-action-btn sd-action-primary">
                    <span aria-hidden="true">🍔</span> Order Food
                  </button>
                  <button type="button" className="sd-action-btn">
                    <span aria-hidden="true">🧾</span> View Orders
                  </button>
                  <button type="button" className="sd-action-btn">
                    <span aria-hidden="true">📍</span> Track Order
                  </button>
                </div>
              </div>
            </aside>
          </section>

          {/* Stats strip */}
          <section className="sd-stats sd-anim" style={{ '--sd-delay': '120ms' }}>
            <StatCard label="Total Orders" value={mockStats.totalOrders} icon="📦" hint="All time" />
            <StatCard label="This Month" value={currency(mockStats.monthlySpend)} icon="💳" hint="Spending" />
            <StatCard
              label="Favorite Item"
              value={mockStats.favoriteItem.name}
              icon={mockStats.favoriteItem.emoji}
              hint={`Ordered ${mockStats.favoriteItem.count}×`}
            />
          </section>

          {/* Recent orders + recommendations/notifications */}
          <section className="sd-content-grid sd-anim" style={{ '--sd-delay': '180ms' }}>
            <div className="sd-panel sd-recent">
              <div className="sd-panel-head">
                <h3 className="sd-panel-title">Recent orders</h3>
                <button type="button" className="sd-link-btn">
                  View all
                </button>
              </div>
              {mockRecentOrders.length ? (
                <ul className="sd-recent-list">
                  {mockRecentOrders.map((o) => (
                    <li key={o.id} className="sd-recent-row">
                      <div className="sd-recent-main">
                        <span className="sd-recent-id">#{o.id}</span>
                        <span className="sd-recent-items">{o.itemSummary}</span>
                      </div>
                      <div className="sd-recent-side">
                        <span className={`sd-status-pill sd-status-${o.status.toLowerCase()}`}>{o.status}</span>
                        <span className="sd-recent-date">{o.date}</span>
                        <span className="sd-recent-total">{currency(o.total)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState icon="🧾" title="No orders yet" message="Your order history will show up here." />
              )}
            </div>

            <div className="sd-side-col">
              <div className="sd-panel sd-recommended">
                <h3 className="sd-panel-title">Recommended for you</h3>
                {mockRecommended.length ? (
                  <div className="sd-recommend-row">
                    {mockRecommended.map((item) => (
                      <FoodCard key={item.id} item={item} compact />
                    ))}
                  </div>
                ) : (
                  <EmptyState icon="🍱" title="Nothing to suggest yet" message="Order a few times and we'll learn your taste." />
                )}
              </div>

              <div className="sd-panel sd-notifications">
                <h3 className="sd-panel-title">Notifications</h3>
                {mockNotifications.length ? (
                  <ul className="sd-notif-list">
                    {mockNotifications.map((n) => (
                      <li key={n.id} className={`sd-notif-item${n.read ? '' : ' sd-notif-unread'}`}>
                        <span className="sd-notif-dot" aria-hidden="true" />
                        <div className="sd-notif-content">
                          <p className="sd-notif-text">{n.text}</p>
                          <span className="sd-notif-time">{n.time}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyState icon="🔔" title="You're all caught up" message="New notifications will appear here." />
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
