
import React from "react";
import WorksheetHero from "@/components/WorksheetHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Grid, History, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <WorksheetHero />
      
      <Tabs defaultValue="recents" className="mt-12">
        <TabsList className="mb-6">
          <TabsTrigger value="recents" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>Recents</span>
          </TabsTrigger>
          <TabsTrigger value="worksheets" className="flex items-center gap-2">
            <Grid className="h-4 w-4" />
            <span>My Worksheets</span>
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span>Activities</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="recents">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Latest Reports</h2>
            <Button variant="link" className="text-blue-600">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {["Sentence Practice", "Math Quiz", "Vocabulary Exercise", "Reading Assignment"].map((title, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription>Completed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span>Accuracy: 85%</span>
                    <span>Mar 28, 2023</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="worksheets">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">My Worksheets</h2>
            <Button variant="link" className="text-blue-600">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Math Crossword", "Word Search", "Science Quiz", "History Timeline"].map((title, i) => (
              <Card key={i} className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 transition-opacity group-hover:opacity-75"></div>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <BookOpen className="h-12 w-12 text-gray-600" />
                </CardContent>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription>Grade: 3rd - 5th</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="activities">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Activities</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Self-Paced Learning", description: "Practice and get better grades with different question formats." },
              { title: "Live Game Mode", description: "Host a video session like a presentation and control the pace for each student." },
              { title: "Jeopardy", description: "Play by forming teams of students, then lead them compete to get the highest score." }
            ].map((activity, i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{activity.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p>{activity.description}</p>
                </CardContent>
                <div className="p-4 pt-0">
                  <Button variant="outline" className="w-full">Preview</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
