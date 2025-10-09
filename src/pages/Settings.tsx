import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="glass border-white/10 p-6">
              <h2 className="text-xl font-bold mb-6">Profile Configuration</h2>
              <div className="space-y-6">
                <div>
                  <Label>Avatar</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary" />
                    <Button variant="outline">Upload New Photo</Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" defaultValue="John Doe" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@johndoe" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" defaultValue="Creative designer & developer" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://example.com" className="mt-2" />
                </div>
                <Button>Save Changes</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="glass border-white/10 p-6">
              <h2 className="text-xl font-bold mb-6">Privacy & Security</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Profile Visibility</h3>
                    <p className="text-sm text-muted-foreground">Make your profile visible to everyone</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Show Activity Status</h3>
                    <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
                <div className="pt-4 border-t border-white/10">
                  <h3 className="font-semibold mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                    <Button>Update Password</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="glass border-white/10 p-6">
              <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    {['New Followers', 'Likes & Reactions', 'Comments & Replies', 'Direct Messages', 'Order Updates'].map((item) => (
                      <div key={item} className="flex items-center justify-between">
                        <span className="text-sm">{item}</span>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <h3 className="font-semibold mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    {['Daily Summary', 'Weekly Digest', 'Marketing & Promotions', 'Product Updates'].map((item) => (
                      <div key={item} className="flex items-center justify-between">
                        <span className="text-sm">{item}</span>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
                <Button>Save Preferences</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card className="glass border-white/10 p-6">
              <h2 className="text-xl font-bold mb-6">Billing Configuration</h2>
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-gradient-primary text-white">
                  <h3 className="text-xl font-bold mb-2">Pro Plan</h3>
                  <p className="text-white/80 mb-4">Full access to all features</p>
                  <p className="text-2xl font-bold">$29/month</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Payment Methods</h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">Add Payment Method</Button>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Billing History</h3>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <div>
                          <p className="font-medium">Jan {i}, 2024</p>
                          <p className="text-sm text-muted-foreground">Pro Plan - Monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">$29.00</p>
                          <Button variant="ghost" size="sm">Download</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
