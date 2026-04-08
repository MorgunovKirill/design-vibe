import { Button } from "@/components/ui/button";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-8">
            <div className="container mx-auto max-w-6xl pt-20">
                {/* Hero */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Taskflow
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Manage your projects and tasks with boards, lists, and cards.
                        A simple and powerful Trello-like project management tool.
                    </p>
                    <div className="flex justify-center gap-4 mt-8">
                        <Button asChild size="lg">
                            <a href="/sign-up">Get Started Free</a>
                        </Button>
                        <Button variant="outline" asChild size="lg">
                            <a href="/sign-in">Sign In</a>
                        </Button>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-2">Boards</h3>
                        <p className="text-muted-foreground">
                            Organize your projects into boards. Each board represents a project or workflow.
                        </p>
                    </div>

                    <div className="border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-2">Lists</h3>
                        <p className="text-muted-foreground">
                            Break down your work into lists. Track progress from &quot;To Do&quot; to &quot;Done&quot;.
                        </p>
                    </div>

                    <div className="border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-2">Cards</h3>
                        <p className="text-muted-foreground">
                            Add cards to lists for individual tasks. Assign members, add labels, and set due dates.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
