import { createClient } from "@/utils/supabase/server";
import InventoryForm from "@/components/dashboard/InventoryForm";

export default async function InventoryPage() {
  const supabase = await createClient();

  let logs: any[] = [];
  try {
    const res = await supabase
      .from("uyo_inventory")
      .select("*")
      .order("date", { ascending: false })
      .limit(50);
    logs = res.data || [];
  } catch (e) {}

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Daily Site Inventory</h2>
        <p className="text-neutral-400 mt-2">
          Track materials, equipment, and stock for the Uyo project.
        </p>
      </div>

      <InventoryForm />

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-neutral-800">
          <h3 className="text-lg font-semibold text-white">Recent Inventory Logs</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-300">
            <thead className="bg-neutral-950 text-neutral-400">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Item No</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">Opening</th>
                <th className="px-4 py-3 font-medium">Received</th>
                <th className="px-4 py-3 font-medium">Used</th>
                <th className="px-4 py-3 font-medium">Closing</th>
                <th className="px-4 py-3 font-medium">Recorded By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {logs && logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-4 py-3">{log.date}</td>
                    <td className="px-4 py-3">{log.item_no}</td>
                    <td className="px-4 py-3">{log.description}</td>
                    <td className="px-4 py-3">{log.unit}</td>
                    <td className="px-4 py-3">{log.opening_stock}</td>
                    <td className="px-4 py-3 text-green-400">+{log.received_today}</td>
                    <td className="px-4 py-3 text-red-400">-{log.used_today}</td>
                    <td className="px-4 py-3 font-semibold text-white">{log.closing_stock}</td>
                    <td className="px-4 py-3">{log.recorded_by}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-neutral-500">
                    No inventory logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
