<?php

namespace App\Contract;

interface BaseContract
{
    public function all($allowedFilters, $allowedSorts, bool|null $withPaginate = null, array $relation = []);
    public function find($id, array $relation = []);
    public function create($payloads);
    public function update($id, $payloads);
    public function destroy($id);
    public function get_with_condition($conditions, $allowedFilters, $allowedSorts, bool|null $withPaginate = null);
    public function update_with_condition($conditions, $payloads);
}
