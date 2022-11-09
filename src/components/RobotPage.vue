<template>
    <div class="container ">
      <h1 class="mt-3">О роботе: <u>БКМ 1</u></h1>
      <div class="row mt-3 p-3 topmenu shadow rounded-2 justify-content-center">
            <div class="col col-auto me-auto">
                <RouterLink to="/" class="btn btn-primary">На главную</RouterLink>
            </div>
            <div class="col col-auto">
                <RouterLink to="/teleop" class="btn btn-primary">Удалённое управление</RouterLink>
            </div>
            <div class="col col-auto">
                <RouterLink to="/" class="btn btn-primary">Отправить на базу</RouterLink>
            </div>
            <div class="col col-auto">
                <RouterLink to="/" class="btn btn-danger">Аварийная остановка</RouterLink>
            </div>
            <div class="col col-1 bg-success ms-2 me-2 text-center rounded-2  h-50">
                <i class="bi bi-battery fs-3  align-middle "></i><span class="align-middle"> 51%</span>
            </div>
            <div class="col col-2">
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                        style="width: 75%">75%</div>
                </div>
                Прогресс задачи: уборка
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-4">
                <h3>Карта</h3>
                <img src="/map_placeholder.png" alt="" class="img-fluid w-100 rounded-3">
            </div>
            <div class="col-4">
                <h3>Задачи</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Тип</th>
                            <th scope="col">Время</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Уборка</td>
                            <td>Выполняется</td>
                            <td><button class="btn btn-sm btn-outline-secondary me-1"><i class="bi bi-arrows-move"></i>
                                    <button class="btn btn-sm btn-outline-danger"><i class="bi bi-stop-fill"></i>
                                    </button>
                                </button></td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Зарядка</td>
                            <td>15:30</td>
                            <td><button class="btn btn-sm btn-outline-secondary me-1"><i class="bi bi-arrows-move"></i>
                                <button class="btn btn-sm btn-outline-success me-1"><i class="bi bi-play-fill"></i>
                                    </button>    
                                <button class="btn btn-sm btn-outline-danger me-1"><i class="bi bi-trash"></i>
                                    </button>
                                    
                                </button></td>
                        </tr>

                    </tbody>
                </table>
                <button class="btn btn btn-primary me-5">Управление задачами</button>
                <button class="btn btn btn-primary">Добавить задачу</button>
            </div>
            <div class="col-4">
                <h3>Уведомления</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            
                            <th scope="col">Время</th>
                        
                            <th scope="col">Сообщение</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-primary">
                            <td>15-35 20.11.2022</td>
                            <td>Задача запущена</td>
                            
                        </tr>
                        <tr class="text-success">
                            <td>15-35 20.11.2022</td>
                            <td>Зарядка завершена</td>
                            
                        </tr>
                        <tr class="text-info">
                           
                           <td>15-35 20.11.2022</td>
                           <td>Зарядка начата</td>
                           
                       </tr>
                        <tr class="text-warning">
                           
                            <td>15-35 20.11.2022</td>
                            <td>Низкий заряд батареи</td>
                            
                        </tr>
                        <tr class="text-primary">
                            <td>15-35 20.11.2022</td>
                            <td>Задача запущена</td>
                            
                        </tr>
                        <tr class="text-warning">
                            <td>15-35 20.11.2022</td>
                            <td>Потеряно соединение</td>
                        </tr>
                        <tr class="text-warning">
                            <td>15-35 20.11.2022</td>
                            <td>Потеряно соединение</td>
                        </tr>
                        <tr class="text-warning">
                            <td>...</td>
                            <td>...</td>
                        </tr>

                    </tbody>
                </table>
                <button class="btn btn-primary">Подробнее</button>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.topmenu {
    background-color: rgb(40, 40, 40);
}
</style>