import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Settings</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-2">
					<Label htmlFor="className">Class Name</Label>
					<Input id="className" placeholder="e.g. Grade 8 Emergency Prep" />
				</div>
				<div className="flex items-center justify-between">
					<div>
						<Label htmlFor="emailNotif">Email Notifications</Label>
						<p className="text-xs text-muted-foreground">Receive email updates for submissions and deadlines</p>
					</div>
					<Switch id="emailNotif" defaultChecked />
				</div>
				<div className="flex items-center justify-between">
					<div>
						<Label htmlFor="autoGrade">Enable Auto-Grading</Label>
						<p className="text-xs text-muted-foreground">Automatically grade objective quizzes</p>
					</div>
					<Switch id="autoGrade" />
				</div>
			</CardContent>
		</Card>
	);
}


