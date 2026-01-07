
import React from 'react';
import { TimelineEvent } from '../types';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span className="absolute top-4 right-4 -mr-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3 space-x-reverse">
                <div>
                  <span className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center ring-8 ring-white">
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 space-x-reverse pt-1.5">
                  <div>
                    <p className="text-sm text-slate-700">{event.description}</p>
                    {event.source && (
                      <p className="text-xs text-indigo-600 mt-1 font-medium">{event.source}</p>
                    )}
                  </div>
                  <div className="whitespace-nowrap text-left text-xs text-slate-400">
                    <time dateTime={event.date}>{event.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
