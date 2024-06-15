<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Datetime;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('subjects')->insert([
            'subject_name' => '大気・地球環境工学',
            'start_time' => '月・1',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('subjects')->insert([
            'subject_name' => '水質学',
            'start_time' => '月・2',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('subjects')->insert([
            'subject_name' => '放射衛生工学',
            'start_time' => '火・2',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('subjects')->insert([
            'subject_name' => '健康科学Ⅰ',
            'start_time' => '火・3',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('subjects')->insert([
            'subject_name' => '振動・波動論',
            'start_time' => '火・4',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('subjects')->insert([
            'subject_name' => '環境装置工学',
            'start_time' => '水・2',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('subjects')->insert([
            'subject_name' => '論理学Ⅰ',
            'start_time' => '水・３',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('subjects')->insert([
            'subject_name' => '環境衛生学',
            'start_time' => '木・１',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('subjects')->insert([
            'subject_name' => '公共経済学',
            'start_time' => '木・2',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('subjects')->insert([
            'subject_name' => '工業数学B2',
            'start_time' => '金・１',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('subjects')->insert([
            'subject_name' => '測量学及び実習(H27以降入学者)',
            'start_time' => '金・2',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
    }
}
