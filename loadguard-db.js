import { supabase } from './supabase.js';

// Mitarbeiter anhand ihrer ID suchen
export async function findEmployee(employeeCode) {
  const { data, error } = await supabase
    .from('employees')
    .select('id, employee_code, display_name, role, active')
    .eq('employee_code', employeeCode)
    .eq('active', true)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// Verladestelle anhand des Barcodes suchen
export async function findDock(barcode) {
  const { data, error } = await supabase
    .from('docks')
    .select('barcode, carrier, active')
    .eq('barcode', barcode)
    .eq('active', true)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// Scanprotokoll speichern
export async function saveScan({
  employeeId,
  parcelBarcode,
  detectedCarrier,
  dockBarcode,
  dockCarrier,
  status,
  message
}) {
  const { data, error } = await supabase
    .from('scan_logs')
    .insert({
      employee_id: employeeId,
      parcel_barcode: parcelBarcode,
      detected_carrier: detectedCarrier,
      dock_barcode: dockBarcode,
      dock_carrier: dockCarrier,
      status,
      message
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Verladestellen anzeigen
export async function getDocks() {
  const { data, error } = await supabase
    .from('docks')
    .select('id, barcode, carrier, active')
    .order('barcode');

  if (error) throw error;
  return data;
}

// Erfolgreiche Verladungen pro Mitarbeiter zählen
export async function getEmployeePerformance() {
  const { data, error } = await supabase
    .from('scan_logs')
    .select('employee_id')
    .eq('status', 'success');

  if (error) throw error;

  const counts = {};

  for (const row of data || []) {
    if (row.employee_id) {
      counts[row.employee_id] = (counts[row.employee_id] || 0) + 1;
    }
  }

  return counts;
}
