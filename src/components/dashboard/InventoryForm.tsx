"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function InventoryForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const openingStock = parseFloat(formData.get("opening_stock") as string) || 0;
    const receivedToday = parseFloat(formData.get("received_today") as string) || 0;
    const usedToday = parseFloat(formData.get("used_today") as string) || 0;
    const closingStock = openingStock + receivedToday - usedToday;

    const { error } = await supabase.from("uyo_inventory").insert({
      date: formData.get("date"),
      recorded_by: formData.get("recorded_by"),
      weather: formData.get("weather"),
      item_no: parseInt(formData.get("item_no") as string, 10),
      description: formData.get("description"),
      unit: formData.get("unit"),
      opening_stock: openingStock,
      received_today: receivedToday,
      used_today: usedToday,
      closing_stock: closingStock,
      location: formData.get("location"),
      remarks: formData.get("remarks"),
    });

    setLoading(false);
    if (!error) {
      e.currentTarget.reset();
      router.refresh();
    } else {
      alert("Error adding inventory record.");
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl space-y-4 text-white">
      <h3 className="text-lg font-semibold border-b border-neutral-800 pb-2">New Inventory Log</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-neutral-400">Date</label>
          <input required type="date" name="date" className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-2 text-sm" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-400">Recorded By</label>
          <input required type="text" name="recorded_by" className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-2 text-sm" placeholder="Name" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-400">Weather</label>
          <input type="text" name="weather" className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-2 text-sm" placeholder="e.g. Sunny" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-neutral-400">Item No</label>
          <input required type="number" name="item_no" className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-2 text-sm" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-400">Material / Item Description</label>
          <input required type="text" name="description" className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-2 text-sm" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-400">Unit</label>
          <input type="text" name="unit" className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-2 text-sm" placeholder="e.g. Bags, Tons" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-neutral-400">Opening Stock</label>
          <input required type="number" step="0.01" name="opening_stock" className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-2 text-sm" defaultValue={0} />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-400">Received Today</label>
          <input required type="number" step="0.01" name="received_today" className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-2 text-sm" defaultValue={0} />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-400">Used / Issued Today</label>
          <input required type="number" step="0.01" name="used_today" className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-2 text-sm" defaultValue={0} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-neutral-400">Location / Storage</label>
          <input type="text" name="location" className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-2 text-sm" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-400">Remarks</label>
          <input type="text" name="remarks" className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-2 text-sm" />
        </div>
      </div>

      <div className="pt-2">
        <button disabled={loading} type="submit" className="w-full md:w-auto bg-yellow-500 text-black hover:bg-yellow-600 font-semibold px-4 py-2 rounded-md disabled:opacity-50">
          {loading ? "Adding..." : "Add Inventory Log"}
        </button>
      </div>
    </form>
  );
}
