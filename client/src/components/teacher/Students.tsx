import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const students = [
	{ name: "Aarav Sharma", email: "aarav@example.com", progress: 82, lastActive: "2h ago" },
	{ name: "Diya Patel", email: "diya@example.com", progress: 71, lastActive: "1d ago" },
	{ name: "Rohan Gupta", email: "rohan@example.com", progress: 55, lastActive: "3h ago" },
	{ name: "Sara Khan", email: "sara@example.com", progress: 90, lastActive: "30m ago" },
];

export default function Students() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>My Students</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead className="text-right">Progress</TableHead>
							<TableHead className="text-right">Last Active</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{students.map((s) => (
							<TableRow key={s.email}>
								<TableCell className="font-medium">{s.name}</TableCell>
								<TableCell>{s.email}</TableCell>
								<TableCell className="text-right">{s.progress}%</TableCell>
								<TableCell className="text-right">{s.lastActive}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}


