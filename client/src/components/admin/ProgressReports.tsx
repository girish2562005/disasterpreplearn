import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
	{ name: "Mon", completion: 62 },
	{ name: "Tue", completion: 68 },
	{ name: "Wed", completion: 71 },
	{ name: "Thu", completion: 75 },
	{ name: "Fri", completion: 79 },
];

export default function ProgressReports() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>System-wide Progress</CardTitle>
			</CardHeader>
			<CardContent className="h-64">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data}>
						<XAxis dataKey="name" />
						<YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
						<Tooltip formatter={(v: number) => `${v}%`} />
						<Line type="monotone" dataKey="completion" stroke="#0ea5e9" strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}


