<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DateTime;
use App\Models\Faculty;
use App\Models\Department;

class FacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departmentsWithFaculties = [
            '工学部' => [
                '地球工学科',
                '建築学科',
                '物理工学科',
                '電気電子工学科',
                '情報学科',
                '工業化学科'
            ],
            '法学部' => [
                '法学科'
            ],
            '経済学部' => [
                '経済経営学科'
            ],
            '農学部' => [
                '資源生物学科',
                '応用生命科学科',
                '地域環境工学科',
                '食料・環境経済学科',
                '森林科学科',
                '食品生物科学科'
            ],
            '理学部' => [
                '理学科'
            ],
            '総合人間学部' => [
                '総合人間学科'
            ],
            '医学部' => [
                '医学科',
                '人間健康科学科'
            ],
            '教育学部' => [
                '教育学科'
            ],
            '薬学部' => [
                '薬科学科',
                '薬学科'
            ],
            '文学部' => [
                '人文学科'
            ],
        ];
        
        $now = new DateTime();
        
        foreach ($departmentsWithFaculties as $departmentName => $faculties) {
            
            $department = Department::where('name', $departmentName)->first();
            
            if ($department) {
                foreach ($faculties as $faculty) {
                    Faculty::create([
                        'name' => $faculty,
                        'department_id' => $department->id,
                        'created_at' => $now,
                        'updated_at' => $now
                    ]);
                }
            }
        }
    }
}
