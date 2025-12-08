import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { courses } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground">Manage your enrolled courses and access materials.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader className="p-0">
                <div className="relative h-40 w-full">
                    <Image
                        src={course.imageUrl || ''}
                        alt={course.title}
                        fill
                        className="object-cover rounded-t-lg"
                        data-ai-hint={course.imageHint}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-6 flex-1">
              <Badge variant="outline" className="mb-2">{course.code}</Badge>
              <CardTitle className="mb-2 text-xl">{course.title}</CardTitle>
              <CardDescription className="mb-4">
                Taught by {course.instructor}
              </CardDescription>
               <div className="space-y-2">
                    <Progress value={course.progress} aria-label={`${course.title} progress`} className="h-2" />
                    <p className="text-xs text-muted-foreground">{course.progress}% complete</p>
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" className="w-full">
                View Materials
              </Button>
              <Button className="w-full">
                Go to Course
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
