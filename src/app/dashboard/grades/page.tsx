import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { grades } from '@/lib/data';
import { GradeChart } from './components/grade-chart';

function calculateGPA(grades: { score: number }[]): string {
  if (grades.length === 0) return 'N/A';
  const totalPoints = grades.reduce((acc, grade) => {
    if (grade.score >= 90) return acc + 4.0;
    if (grade.score >= 80) return acc + 3.0;
    if (grade.score >= 70) return acc + 2.0;
    if (grade.score >= 60) return acc + 1.0;
    return acc;
  }, 0);
  return (totalPoints / grades.length).toFixed(2);
}

export default function GradesPage() {
  const gpa = calculateGPA(grades);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gradebook</h1>
        <p className="text-muted-foreground">View your grades and track academic performance.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>All Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Term</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead className="text-right">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grades.map((grade, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{grade.courseTitle}</div>
                        <div className="text-sm text-muted-foreground">{grade.courseCode}</div>
                      </TableCell>
                      <TableCell>{grade.term}</TableCell>
                      <TableCell className="text-right">{grade.score}%</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={grade.score >= 90 ? 'default' : grade.score >= 70 ? 'secondary' : 'destructive'} className="bg-primary/20 text-primary-foreground">
                          {grade.grade}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cumulative GPA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-primary">{gpa}</p>
              <p className="text-sm text-muted-foreground">on a 4.0 scale</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <CardDescription>Based on final scores.</CardDescription>
            </CardHeader>
            <CardContent>
                <GradeChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
