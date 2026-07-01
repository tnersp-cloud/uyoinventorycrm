import { createClient } from "@/utils/supabase/server";

export default async function ProgramOfWorksPage() {
  const supabase = await createClient();

  let works: any[] = [];
  try {
    const res = await supabase
      .from("uyo_program_of_works")
      .select("*")
      .order("activity_no", { ascending: true });
    works = res.data || [];
  } catch (e) {}

  const months = Array.from({ length: 15 }, (_, i) => `M${i + 1}`);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Program of Works</h2>
          <p className="text-neutral-400 mt-2">
            250-Unit, 2-Bedroom Bungalow Development Accelerated Schedule
          </p>
        </div>
        <button className="bg-yellow-500 text-black hover:bg-yellow-600 font-semibold px-4 py-2 rounded-md">
          Add Activity
        </button>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-neutral-800">
          <h3 className="text-lg font-semibold text-white">15-Month Phased Delivery</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-300 whitespace-nowrap">
            <thead className="bg-neutral-950 text-neutral-400">
              <tr>
                <th className="px-4 py-3 font-medium sticky left-0 z-10 bg-neutral-950 border-r border-neutral-800">No.</th>
                <th className="px-4 py-3 font-medium sticky left-12 z-10 bg-neutral-950 border-r border-neutral-800">Activity</th>
                <th className="px-4 py-3 font-medium text-center">Duration</th>
                <th className="px-4 py-3 font-medium text-center border-r border-neutral-800">Start</th>
                {months.map(m => (
                  <th key={m} className="px-4 py-3 font-medium text-center min-w-[60px]">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {works && works.length > 0 ? (
                works.map((work) => (
                  <tr key={work.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-4 py-3 sticky left-0 z-10 bg-neutral-900 border-r border-neutral-800">{work.activity_no}</td>
                    <td className="px-4 py-3 sticky left-12 z-10 bg-neutral-900 border-r border-neutral-800 font-medium text-white">{work.activity_name}</td>
                    <td className="px-4 py-3 text-center">{work.duration_months} mo</td>
                    <td className="px-4 py-3 text-center border-r border-neutral-800">{work.start_month}</td>
                    {months.map(m => {
                      const isActive = work[m.toLowerCase() as keyof typeof work];
                      return (
                        <td key={m} className="px-1 py-1 text-center border-r border-neutral-800/50 last:border-0">
                          {isActive && (
                            <div className="w-full h-8 bg-yellow-500/80 rounded-sm"></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={19} className="px-4 py-8 text-center text-neutral-500">
                    No activities found. The timeline will appear here once tasks are scheduled.
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
