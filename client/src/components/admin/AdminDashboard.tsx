import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];

const usersData = [
	{ role: "Students", count: 248 },
	{ role: "Teachers", count: 12 },
	{ role: "Admins", count: 2 },
];

const activityData = [
	{ name: "Mon", active: 120 },
	{ name: "Tue", active: 180 },
	{ name: "Wed", active: 160 },
	{ name: "Thu", active: 200 },
	{ name: "Fri", active: 230 },
];

export default function AdminDashboard() {
	return (
		<div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
			<Card className="xl:col-span-2">
				<CardHeader>
					<CardTitle>Weekly Active Users</CardTitle>
				</CardHeader>
				<CardContent className="h-64">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={activityData}>
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="active" fill="#6366f1" radius={[4,4,0,0]} />
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>User Breakdown</CardTitle>
				</CardHeader>
				<CardContent className="h-64">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie data={usersData} dataKey="count" nameKey="role" innerRadius={50} outerRadius={80}>
								{usersData.map((_, i) => (
									<Cell key={i} fill={COLORS[i % COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
			<Card className="xl:col-span-3">
				<CardHeader>
					<CardTitle>System Health</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4 sm:grid-cols-3">
					<div className="p-4 border rounded-lg">
						<p className="text-sm text-muted-foreground">API Uptime</p>
						<p className="text-2xl font-semibold">99.98%</p>
					</div>
					<div className="p-4 border rounded-lg">
						<p className="text-sm text-muted-foreground">Avg Response</p>
						<p className="text-2xl font-semibold">142ms</p>
					</div>
					<div className="p-4 border rounded-lg">
						<p className="text-sm text-muted-foreground">Errors (24h)</p>
						<p className="text-2xl font-semibold">3</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}


