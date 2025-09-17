import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0ea5e9", "#22c55e", "#eab308", "#ef4444"];

const classProgressData = [
	{ name: "Week 1", avg: 62 },
	{ name: "Week 2", avg: 68 },
	{ name: "Week 3", avg: 74 },
	{ name: "Week 4", avg: 81 },
];

const completionData = [
	{ name: "Completed", value: 58 },
	{ name: "In Progress", value: 24 },
	{ name: "Not Started", value: 12 },
	{ name: "Overdue", value: 6 },
];

export default function TeacherDashboard() {
	return (
		<div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
			<Card className="xl:col-span-2">
				<CardHeader>
					<CardTitle>Class Average Progress</CardTitle>
				</CardHeader>
				<CardContent className="h-64">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={classProgressData}>
							<XAxis dataKey="name" />
							<YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
							<Tooltip formatter={(v: number) => `${v}%`} />
							<Bar dataKey="avg" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Module Completion</CardTitle>
				</CardHeader>
				<CardContent className="h-64">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie data={completionData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
								{completionData.map((_, idx) => (
									<Cell key={idx} fill={COLORS[idx % COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			<Card className="xl:col-span-3">
				<CardHeader>
					<CardTitle>Upcoming Deadlines</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						<div>
							<p className="text-sm text-muted-foreground">Assignment 3</p>
							<p className="text-sm font-medium mb-1">Earthquake Safety Quiz</p>
							<Progress value={72} />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Project</p>
							<p className="text-sm font-medium mb-1">CPR Practice</p>
							<Progress value={41} />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Module</p>
							<p className="text-sm font-medium mb-1">Emergency Response</p>
							<Progress value={55} />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Assignment 4</p>
							<p className="text-sm font-medium mb-1">Fire Drill Scenario</p>
							<Progress value={18} />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}


