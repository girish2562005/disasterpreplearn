import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const modules = [
	{ title: "Earthquake Safety", lessons: 6, status: "Published" },
	{ title: "CPR & First Aid", lessons: 8, status: "Draft" },
	{ title: "Fire Safety Basics", lessons: 5, status: "Published" },
];

export default function CourseContent() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Manage Course Content</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{modules.map((m) => (
						<div key={m.title} className="p-4 border rounded-lg">
							<div className="flex items-center justify-between mb-2">
								<h3 className="font-semibold">{m.title}</h3>
								<Badge variant={m.status === "Published" ? "default" : "secondary"}>{m.status}</Badge>
							</div>
							<p className="text-sm text-muted-foreground">{m.lessons} lessons</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}


