import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const students = [
	{ name: "All Students", count: 248 },
	{ name: "Active (7d)", count: 178 },
	{ name: "At Risk", count: 12 },
];

export default function Students() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Students Overview</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Segment</TableHead>
							<TableHead className="text-right">Count</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{students.map((s) => (
							<TableRow key={s.name}>
								<TableCell className="font-medium">{s.name}</TableCell>
								<TableCell className="text-right">{s.count}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}


