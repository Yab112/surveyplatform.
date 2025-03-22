"use client";

import { motion } from "framer-motion";
import { Trash2, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Survey {
  id: number;
  title: string;
  completion: number;
  date: string;
  status: string;
}

interface SurveyTableProps {
  surveys: Survey[];
  onDeleteSurvey: (id: number) => void;
}

export function SurveyTable({ surveys, onDeleteSurvey }: SurveyTableProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <Tabs defaultValue="recent" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="recent">Recent Surveys</TabsTrigger>
            <TabsTrigger value="all">All Surveys</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="recent" className="mt-0">
          <Card className="border-primary/10">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Survey Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Completion
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {surveys.map((survey) => (
                    <TableRow key={survey.id} className="group">
                      <TableCell className="font-medium">
                        {survey.title}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {survey.completion}%
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {survey.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            survey.status === "Active"
                              ? "default"
                              : survey.status === "Completed"
                              ? "secondary" // Map "Completed" to "secondary"
                              : "outline" // Map other statuses to "outline"
                          }
                          className={
                            survey.status === "Active"
                              ? "bg-green-500/20 text-green-700 hover:bg-green-500/20 dark:text-green-400"
                              : survey.status === "Completed"
                              ? "bg-blue-500/20 text-blue-700 hover:bg-blue-500/20 dark:text-blue-400"
                              : "bg-gray-500/20 text-gray-700 hover:bg-gray-500/20 dark:text-gray-400"
                          }
                        >
                          {survey.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            onClick={() => onDeleteSurvey(survey.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-6">
              <p>View all your surveys here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts">
          <Card>
            <CardContent className="p-6">
              <p>View your draft surveys here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
