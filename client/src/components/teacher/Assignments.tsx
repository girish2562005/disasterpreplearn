import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const assignments = [
	{ title: "Earthquake Safety Quiz", due: "Fri, 20 Sep", status: "Open", submissions: 18 },
	{ title: "CPR Practice Upload", due: "Mon, 22 Sep", status: "Open", submissions: 5 },
	{ title: "Fire Drill Reflection", due: "Wed, 24 Sep", status: "Closed", submissions: 27 },
];

export default function Assignments() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Assignments</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Due</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Submissions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{assignments.map((a) => (
							<TableRow key={a.title}>
								<TableCell className="font-medium">{a.title}</TableCell>
								<TableCell>{a.due}</TableCell>
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


