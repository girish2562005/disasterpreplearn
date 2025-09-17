import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const trend = [
	{ day: "Mon", avg: 62 },
	{ day: "Tue", avg: 64 },
	{ day: "Wed", avg: 69 },
	{ day: "Thu", avg: 73 },
	{ day: "Fri", avg: 76 },
];

const reports = [
	{ student: "Aarav Sharma", module: "Earthquake Safety", score: 88, status: "On Track" },
	{ student: "Diya Patel", module: "CPR & First Aid", score: 72, status: "At Risk" },
	{ student: "Rohan Gupta", module: "Fire Safety Basics", score: 59, status: "Behind" },
];

export default function ProgressReports() {
	return (
		<div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
			<Card className="lg:col-span-2">
				<CardHeader>
					<CardTitle>Class Progress Trend</CardTitle>
				</CardHeader>
				<CardContent className="h-64">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={trend}>
							<XAxis dataKey="day" />
							<YAxis domain={[0, 100]} hide />
							<Tooltip formatter={(v: number) => `${v}%`} />
							<Area dataKey="avg" stroke="#22c55e" fill="#22c55e22" strokeWidth={2} />
						</AreaChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Summary</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">Average score this week: <span className="font-medium">72%</span></p>
					<p className="text-sm text-muted-foreground">Students at risk: <span className="font-medium">3</span></p>
				</CardContent>
			</Card>
			<Card className="lg:col-span-3">
				<CardHeader>
					<CardTitle>Detailed Reports</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Student</TableHead>
								<TableHead>Module</TableHead>
								<TableHead className="text-right">Score</TableHead>
								<TableHead className="text-right">Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{reports.map((r) => (
								<TableRow key={`${r.student}-${r.module}`}>
									<TableCell className="font-medium">{r.student}</TableCell>
									<TableCell>{r.module}</TableCell>
									<TableCell className="text-right">{r.score}%</TableCell>
									<TableCell className="text-right">{r.status}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}


