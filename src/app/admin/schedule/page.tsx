"use client";

import React from 'react';
import PageHeader from '@/components/admin/shared/PageHeader';
import StatusBadge from '@/components/admin/shared/StatusBadge';

const MOCK_APPOINTMENTS = [
  { id: '1', time: '09:00', duration: '30m', patient: 'Sita Rai', treatment: 'Checkup', dentist: 'Dr. Sharma', status: 'In Room' },
  { id: '2', time: '09:30', duration: '30m', patient: 'Ram Karki', treatment: 'Cleaning', dentist: 'Dr. Sharma', status: 'Waiting' },
  { id: '3', time: '10:00', duration: '60m', patient: 'Binita Shrestha', treatment: 'Crown', dentist: 'Dr. Sharma', status: 'Scheduled' },
  { id: '4', time: '14:00', duration: '45m', patient: 'Anita Thapa', treatment: 'Root Canal', dentist: 'Dr. Joshi', status: 'Confirmed' },
];

export default function SchedulePage() {
  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader 
        title="Schedule" 
        description="Manage appointments and calendar views."
        action={{ label: 'New Appointment' }}
      />

      <div className="flex-1 rounded-xl border border-border-default bg-white shadow-sm flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-default p-4 gap-4">
          <div className="flex items-center gap-4">
            <button className="text-text-muted hover:text-text-heading p-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <h3 className="text-lg font-semibold text-text-heading px-2">Today, Oct 15</h3>
            <button className="text-text-muted hover:text-text-heading p-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
          <div className="flex gap-2">
            <select className="rounded-md border border-border-default px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-brand-primary">
              <option>Day View</option>
              <option>Week View</option>
            </select>
          </div>
        </div>

        {/* Schedule List View Mock */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {MOCK_APPOINTMENTS.map(apt => (
            <div key={apt.id} className="flex flex-col sm:flex-row gap-4 border border-border-default rounded-lg p-4 hover:border-brand-primary transition-colors cursor-pointer group">
              <div className="sm:w-24 shrink-0 border-b sm:border-b-0 sm:border-r border-border-default pb-3 sm:pb-0 sm:pr-4 flex flex-col justify-center">
                <span className="text-lg font-bold text-text-heading">{apt.time}</span>
                <span className="text-xs text-text-muted">{apt.duration}</span>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <div>
                  <p className="text-sm font-semibold text-brand-primary">{apt.patient}</p>
                  <p className="text-xs text-text-muted">{apt.treatment}</p>
                </div>
                <div>
                  <p className="text-sm text-text-body flex items-center gap-2">
                    <svg className="text-text-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    {apt.dentist}
                  </p>
                </div>
                <div className="flex sm:justify-end">
                  <StatusBadge status={apt.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
