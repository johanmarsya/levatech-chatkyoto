<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Datetime;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('departments')->insert([
            'name' => '工学部',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('departments')->insert([
            'name' => '法学部',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('departments')->insert([
            'name' => '経済学部',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('departments')->insert([
            'name' => '農学部',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('departments')->insert([
            'name' => '理学部',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('departments')->insert([
            'name' => '総合人間学部',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('departments')->insert([
            'name' => '医学部',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('departments')->insert([
            'name' => '教育学部',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('departments')->insert([
            'name' => '薬学部',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
        DB::table('departments')->insert([
            'name' => '文学部',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
    }
}
