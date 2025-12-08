import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { courses, user, grades, announcements, assignments } from '@/lib/data';
import { formatDistanceToNow } from 'date-fns';

export default function DashboardPage() {
  const recentGrades = grades.slice(0, 3);
  const recentAnnouncements = announcements.slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's a snapshot of your academic progress.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Your currently enrolled courses.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {courses.slice(0, 3).map((course) => (
              <div key={course.id} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                    <BookText className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium truncate">{course.title}</p>
                  <p className="text-sm text-muted-foreground">{course.code}</p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/courses">View</Link>
                </Button>
              </div>
            ))}
          </CardContent>
           <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/courses">View All Courses</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Deadlines you need to watch out for.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.filter(a => !a.submitted).map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">{assignment.title} <span className="text-muted-foreground text-xs">({assignment.courseCode})</span></TableCell>
                    <TableCell>{assignment.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
             <Button variant="link" className="absolute top-4 right-4 h-auto p-0" asChild>
              <Link href="/dashboard/announcements">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {recentAnnouncements.map((ann) => (
              <div key={ann.id}>
                <p className="font-semibold">{ann.title}</p>
                <p className="text-sm text-muted-foreground">
                  {ann.author} &middot; {formatDistanceToNow(new Date(ann.date), { addSuffix: true })}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>You're making great progress. Keep it up!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {courses.slice(0,2).map((course) => (
                <div key={course.id} className="space-y-2">
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.progress}% complete</p>
                    </div>
                    <Progress value={course.progress} aria-label={`${course.title} progress`} />
                </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
