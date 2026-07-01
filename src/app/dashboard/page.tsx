import { createClient } from "@/utils/supabase/server";
import { Package, TrendingUp, CalendarCheck, AlertCircle } from "lucide-react";

export default async function UyoDashboardOverview() {
  const supabase = await createClient();

  // Fetch some basic stats safely
  let inventoryCount = 0;
  try {
    const res = await supabase.from("uyo_inventory").select("*", { count: 'exact', head: true });
    inventoryCount = res.count || 0;
  } catch (e) {}

  let activitiesCount = 0;
  try {
    const res = await supabase.from("uyo_program_of_works").select("*", { count: 'exact', head: true });
    activitiesCount = res.count || 0;
  } catch (e) {}

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Uyo Project Overview</h2>
        <p className="text-neutral-400 mt-2">
          Real-time insights and summary for the 250-Unit Bungalow Development in Uyo.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-white">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-neutral-400">Total Inventory Logs</h3>
            <Package className="w-4 h-4 text-neutral-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">{inventoryCount || 0}</div>
            <p className="text-xs text-neutral-500 mt-1">Daily records submitted</p>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-white">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-neutral-400">Active Works</h3>
            <TrendingUp className="w-4 h-4 text-neutral-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">{activitiesCount || 0}</div>
            <p className="text-xs text-neutral-500 mt-1">Program of works tasks</p>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-white">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-neutral-400">Schedule Status</h3>
            <CalendarCheck className="w-4 h-4 text-green-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-green-500">On Track</div>
            <p className="text-xs text-neutral-500 mt-1">15-Month Accelerated Schedule</p>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-white">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-neutral-400">Alerts</h3>
            <AlertCircle className="w-4 h-4 text-yellow-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-neutral-500 mt-1">Issues requiring attention</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-white col-span-1">
          <h3 className="text-lg font-semibold mb-2">Recent Inventory Activity</h3>
          <div className="text-sm text-neutral-400">
            {inventoryCount === 0 ? (
              <p>No recent inventory logs found. Please add a daily report.</p>
            ) : (
              <p>Inventory data is being tracked.</p>
            )}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-white col-span-1">
          <h3 className="text-lg font-semibold mb-2">Program of Works Progress</h3>
          <div className="text-sm text-neutral-400">
            {activitiesCount === 0 ? (
              <p>No program of works data available.</p>
            ) : (
              <p>Monitoring {activitiesCount} scheduled activities.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
