import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const assignments = [
	{ title: "Earthquake Safety Quiz", course: "Earthquake Safety", status: "Open", submissions: 124 },
	{ title: "CPR Practice Upload", course: "CPR & First Aid", status: "Open", submissions: 87 },
	{ title: "Fire Drill Reflection", course: "Fire Safety Basics", status: "Closed", submissions: 203 },
];

export default function Assignments() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Assignments (All Classes)</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Course</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Submissions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{assignments.map((a) => (
							<TableRow key={a.title}>
								<TableCell className="font-medium">{a.title}</TableCell>
								<TableCell>{a.course}</TableCell>
								<TableCell>
									<Badge variant={a.status === "Open" ? "default" : "secondary"}>{a.status}</Badge>
								</TableCell>
								<TableCell className="text-right">{a.submissions}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}


