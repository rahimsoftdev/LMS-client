import { useCourses } from '@/hooks/useCourses';
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CourseGrid from '@/components/course/CourseGrid'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'
import LoadingState from '@/components/ui/LoadingState'
// import React from 'react';

const PopulserClass = () => {
    const { courses, loading, error, reload } = useCourses()
    //  const { courses, loading, error, reload } = useCourses()
    return (
        <section className="container py-10 md:py-12 xl:py-section">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                    Featured courses
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    Live courses published by the admin team.
                </p>
                <Link
                    to="/courses"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
                >
                    View all courses
                    <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
            </div>

            <div className="mt-8 lg:mt-10">
                {loading && <LoadingState />}

                {!loading && error && (
                    <ErrorState message={error} onRetry={() => void reload()} />
                )}

                {!loading && !error && courses.length === 0 && (
                    <EmptyState
                        title="No courses yet"
                        description="Check back soon — new courses will appear here."
                    />
                )}

                {!loading && !error && courses.length > 0 && (
                    <CourseGrid courses={courses.slice(0, 4)} />
                )}
            </div>
        </section>
    );
};

export default PopulserClass;