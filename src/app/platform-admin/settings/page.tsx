"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/shared/PageHeader";

export default function PlatformSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'billing', label: 'Billing' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
    { id: 'integrations', label: 'Integrations' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Platform Settings" 
        description="Configure platform-wide settings"
      />

      {/* Tabs */}
      <div className="border-b border-border-default">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-text-muted hover:text-text-heading'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-border-default p-6 shadow-sm">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-heading mb-4">General Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-heading mb-1.5">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    defaultValue="mysaas"
                    className="w-full max-w-md rounded-md border border-border-default px-3 py-2 text-sm text-text-heading focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-heading mb-1.5">
                    Support Email
                  </label>
                  <input
                    type="email"
                    defaultValue="support@mysaas.com"
                    className="w-full max-w-md rounded-md border border-border-default px-3 py-2 text-sm text-text-heading focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-heading mb-1.5">
                    Default Trial Duration (days)
                  </label>
                  <input
                    type="number"
                    defaultValue="14"
                    className="w-full max-w-md rounded-md border border-border-default px-3 py-2 text-sm text-text-heading focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="requireApproval"
                    defaultChecked
                    className="h-4 w-4 rounded border-border-default text-brand-primary focus:ring-brand-primary"
                  />
                  <label htmlFor="requireApproval" className="text-sm text-text-body">
                    Require manual approval for new clinic signups
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-default">
              <button className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover shadow-sm transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-heading mb-4">Billing Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-heading mb-1.5">
                    Payment Gateway
                  </label>
                  <select className="w-full max-w-md rounded-md border border-border-default px-3 py-2 text-sm text-text-heading focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary">
                    <option>Stripe</option>
                    <option>PayPal</option>
                    <option>Authorize.net</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-heading mb-1.5">
                    Currency
                  </label>
                  <select className="w-full max-w-md rounded-md border border-border-default px-3 py-2 text-sm text-text-heading focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-heading mb-1.5">
                    Invoice Prefix
                  </label>
                  <input
                    type="text"
                    defaultValue="INV-"
                    className="w-full max-w-md rounded-md border border-border-default px-3 py-2 text-sm text-text-heading focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="autoInvoices"
                    defaultChecked
                    className="h-4 w-4 rounded border-border-default text-brand-primary focus:ring-brand-primary"
                  />
                  <label htmlFor="autoInvoices" className="text-sm text-text-body">
                    Automatically send invoices before billing cycle
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-default">
              <button className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover shadow-sm transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-heading mb-4">Notification Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-heading">New Demo Requests</p>
                    <p className="text-xs text-text-muted">Receive notifications when new demo requests are submitted</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-border-default text-brand-primary focus:ring-brand-primary"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-heading">Payment Failures</p>
                    <p className="text-xs text-text-muted">Alert when subscription payments fail</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-border-default text-brand-primary focus:ring-brand-primary"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-heading">Trial Expiring</p>
                    <p className="text-xs text-text-muted">Notify when trial periods are about to end</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-border-default text-brand-primary focus:ring-brand-primary"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-heading">New Clinic Signups</p>
                    <p className="text-xs text-text-muted">Alert when new clinics register</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-border-default text-brand-primary focus:ring-brand-primary"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-default">
              <button className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover shadow-sm transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-heading mb-4">Security Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-heading mb-1.5">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    defaultValue="60"
                    className="w-full max-w-md rounded-md border border-border-default px-3 py-2 text-sm text-text-heading focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="twoFactor"
                    defaultChecked
                    className="h-4 w-4 rounded border-border-default text-brand-primary focus:ring-brand-primary"
                  />
                  <label htmlFor="twoFactor" className="text-sm text-text-body">
                    Require two-factor authentication for platform admins
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="ipWhitelist"
                    className="h-4 w-4 rounded border-border-default text-brand-primary focus:ring-brand-primary"
                  />
                  <label htmlFor="ipWhitelist" className="text-sm text-text-body">
                    Enable IP whitelist for platform admin access
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="auditLog"
                    defaultChecked
                    className="h-4 w-4 rounded border-border-default text-brand-primary focus:ring-brand-primary"
                  />
                  <label htmlFor="auditLog" className="text-sm text-text-body">
                    Enable comprehensive audit logging
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-default">
              <button className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover shadow-sm transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-heading mb-4">Integrations</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border-default rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-text-heading">Email Service</p>
                    <p className="text-xs text-text-muted">SendGrid / Mailgun / AWS SES</p>
                  </div>
                  <button className="text-sm text-brand-primary hover:text-brand-primary-hover font-medium">
                    Configure
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border-default rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-text-heading">Analytics</p>
                    <p className="text-xs text-text-muted">Google Analytics / Mixpanel</p>
                  </div>
                  <button className="text-sm text-brand-primary hover:text-brand-primary-hover font-medium">
                    Configure
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border-default rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-text-heading">CRM</p>
                    <p className="text-xs text-text-muted">Salesforce / HubSpot</p>
                  </div>
                  <button className="text-sm text-brand-primary hover:text-brand-primary-hover font-medium">
                    Configure
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border-default rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-text-heading">SMS Service</p>
                    <p className="text-xs text-text-muted">Twilio</p>
                  </div>
                  <button className="text-sm text-brand-primary hover:text-brand-primary-hover font-medium">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
