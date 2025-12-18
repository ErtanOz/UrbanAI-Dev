import React, { useState, useMemo } from 'react';
import MapComponent from './components/MapComponent';
import { LOCATIONS, EVENTS } from './data';
import { AppState } from './types';
import { Search, Map as LucideMap, Calendar, Info, TreePine, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    selectedLocationId: null,
    selectedEventId: null,
    filterCategory: 'Alle',
    searchQuery: '',
  });

  const filteredLocations = useMemo(() => {
    const data = LOCATIONS || [];
    return data.filter(loc => {
      const matchesCategory = state.filterCategory === 'Alle' || loc.category === state.filterCategory;
      const matchesSearch = loc.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                           loc.description.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [state.filterCategory, state.searchQuery]);

  const selectedLocation = useMemo(() => {
    const data = LOCATIONS || [];
    return data.find(l => l.id === state.selectedLocationId);
  }, [state.selectedLocationId]);

  const locationEvents = useMemo(() => {
    if (!state.selectedLocationId) return [];
    const data = EVENTS || [];
    return data.filter(e => e.locationId === state.selectedLocationId);
  }, [state.selectedLocationId]);

  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-white overflow-hidden">
      {/* Sidebar for Navigation & Filters */}
      <div className="w-full md:w-96 flex flex-col border-r border-slate-200 bg-white z-[1000] shadow-xl overflow-hidden relative">
        <header className="p-6 bg-red-600 text-white flex-shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <TreePine size={24} />
            <h1 className="text-xl font-bold tracking-tight">Kölner Grün-Events</h1>
          </div>
          <p className="text-red-100 text-sm opacity-90">Veranstaltungsprogramm 2026</p>
        </header>

        <div className="p-4 bg-slate-50 border-b border-slate-200 flex-shrink-0">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Ort oder Stichwort suchen..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              value={state.searchQuery}
              onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {['Alle', 'Garten', 'Wald', 'Kultur', 'Tierpark'].map(cat => (
              <button
                key={cat}
                onClick={() => setState(prev => ({ ...prev, filterCategory: cat }))}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  state.filterCategory === cat 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-grow overflow-y-auto">
          {filteredLocations.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {filteredLocations.map(loc => (
                <button
                  key={loc.id}
                  onClick={() => setState(prev => ({ ...prev, selectedLocationId: loc.id }))}
                  className={`w-full p-4 text-left hover:bg-slate-50 transition-colors flex flex-col gap-1 ${
                    state.selectedLocationId === loc.id ? 'bg-red-50 border-l-4 border-red-600' : 'border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{loc.category}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                      {(EVENTS || []).filter(e => e.locationId === loc.id).length} Events
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 leading-tight">{loc.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1 flex items-center gap-1">
                    <LucideMap size={12} className="shrink-0" />
                    {loc.address}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center text-slate-400">
              <Info size={40} className="mx-auto mb-4 opacity-20" />
              <p>Keine Orte gefunden.</p>
            </div>
          )}
        </div>

        {/* Selected Location Details Overlay */}
        {selectedLocation && (
          <div className="absolute inset-0 top-[138px] bg-white z-[1001] flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <button 
                onClick={() => setState(prev => ({ ...prev, selectedLocationId: null }))}
                className="text-slate-400 hover:text-slate-600 text-sm font-medium flex items-center gap-1 transition-colors"
              >
                &larr; Zurück zur Liste
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6">
              <div className="mb-6">
                <span className="text-[10px] uppercase font-bold tracking-wider text-red-600 mb-1 block">{selectedLocation.category}</span>
                <h2 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{selectedLocation.name}</h2>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed italic">{selectedLocation.description}</p>
                <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200">
                  <p className="flex items-center gap-2 mb-1">
                    <LucideMap size={14} className="text-slate-400" />
                    {selectedLocation.address}
                  </p>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-red-600" />
                Bevorstehende Veranstaltungen
              </h4>

              {locationEvents.length > 0 ? (
                <div className="space-y-4">
                  {locationEvents.map(event => (
                    <div key={event.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:shadow-md transition-shadow">
                      <h5 className="font-bold text-slate-900 text-sm mb-1">{event.title}</h5>
                      <p className="text-xs font-semibold text-red-600 mb-2">{event.date} | {event.time}</p>
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">{event.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {event.accessible && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">
                            ♿ Barrierefrei
                          </span>
                        )}
                        {event.hasWC && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-green-50 text-green-700 text-[10px] font-bold">
                            🚻 WC
                          </span>
                        )}
                        {event.registrationRequired && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 text-[10px] font-bold">
                            📝 Anmeldung
                          </span>
                        )}
                      </div>

                      {event.registrationUrl && (
                        <a 
                          href={event.registrationUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors mb-3 shadow-sm w-full justify-center"
                        >
                          <ExternalLink size={14} />
                          Event anmelden
                        </a>
                      )}

                      {event.guide && (
                        <p className="text-[10px] text-slate-500">Führung: <span className="font-semibold">{event.guide}</span></p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Derzeit keine spezifischen Veranstaltungen für diesen Ort gelistet.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Map View */}
      <div className="flex-grow relative bg-slate-100">
        <MapComponent 
          locations={filteredLocations} 
          onSelectLocation={(id) => setState(prev => ({ ...prev, selectedLocationId: id }))}
          selectedLocationId={state.selectedLocationId}
        />
        
        {/* Floating Attribution/Stats */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-200 text-[10px] font-semibold text-slate-600 flex items-center gap-3 z-[1001]">
          <span>Stadt Köln 2026</span>
          <div className="w-px h-3 bg-slate-300" />
          <span>{filteredLocations.length} Grüne Orte</span>
        </div>
      </div>
    </div>
  );
};

export default App;