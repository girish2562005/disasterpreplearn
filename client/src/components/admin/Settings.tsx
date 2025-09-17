import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>System Settings</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-2">
					<Label htmlFor="orgName">Organization Name</Label>
					<Input id="orgName" placeholder="e.g. DisasterPrep Academy" />
				</div>
				<div className="flex items-center justify-between">
					<div>
						<Label htmlFor="maintenance">Maintenance Mode</Label>
						<p className="text-xs text-muted-foreground">Temporarily disable student access</p>
					</div>
					<Switch id="maintenance" />
				</div>
				<div className="flex items-center justify-between">
					<div>
						<Label htmlFor="analytics">Enable Analytics</Label>
						<p className="text-xs text-muted-foreground">Collect anonymized usage metrics</p>
					</div>
					<Switch id="analytics" defaultChecked />
				</div>
			</CardContent>
		</Card>
	);
}


