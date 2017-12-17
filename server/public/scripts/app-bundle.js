define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'list',
        moduleId: './modules/list',
        name: 'List',
        auth: true
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var authConfig = {
        baseUrl: "http://localhost:5000/api",
        loginUrl: '/users/login',
        tokenName: 'token',
        authHeader: 'Authorization',
        authToken: '',
        logoutRedirect: '#/home'
    };

    exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', './auth-config', 'regenerator-runtime'], function (exports, _environment, _authConfig, _regeneratorRuntime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  Promise.config({ warnings: { wForgottenReturn: false } });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
    function Home(router, users, auth) {
      _classCallCheck(this, Home);

      this.router = router;
      this.auth = auth;
      this.loginError = '';
      this.users = users;
      this.message = 'Home';
      this.showLogin = true;
    }

    Home.prototype.showRegister = function showRegister() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      };
      this.registerError = "";

      this.showLogin = false;
    };

    Home.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(this.user);
                _context.next = 3;
                return this.users.save(this.user);

              case 3:
                serverResponse = _context.sent;

                if (!serverResponse.error) {
                  this.showLogin = true;
                } else {
                  this.registerError = "There was a problem registering the user.";
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    Home.prototype.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        _this.loginError = "";
        _this.router.navigate('list');
      }).catch(function (error) {
        console.log(error);
        _this.loginError = "Invalid credentials.";
      });
    };

    return Home;
  }()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', '../resources/data/mypics', '../resources/data/gallery', 'aurelia-router', 'aurelia-auth'], function (exports, _aureliaFramework, _mypics, _gallery, _aureliaRouter, _aureliaAuth) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.List = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _gallery.Mygallery, _mypics.MyPics, _aureliaAuth.AuthService), _dec(_class = function () {
        function List(router, mygallery, mypics, auth) {
            _classCallCheck(this, List);

            this.mypics = mypics;
            this.router = router;
            this.mygallery = mygallery;
            this.message = 'home';
            this.auth = auth;
            this.user = JSON.parse(sessionStorage.getItem('user'));
            this.showing = "mypicList";
            this.getgallery = JSON.parse(sessionStorage.getItem('mygallery'));
        }

        List.prototype.activate = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.mygallery.getUserMygallery(this.user._id);

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function activate() {
                return _ref.apply(this, arguments);
            }

            return activate;
        }();

        List.prototype.showPhotos = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(mygallery) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                sessionStorage.setItem("mygallery", JSON.stringify(mygallery));
                                _context2.next = 3;
                                return this.mypics.getUserMypics(JSON.parse(sessionStorage.getItem('mygallery'))._id);

                            case 3:
                                this.showing = "photoList";

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function showPhotos(_x) {
                return _ref2.apply(this, arguments);
            }

            return showPhotos;
        }();

        List.prototype.createGallery = function createGallery() {
            this.myGalleryObj = {
                gallery: "",
                description: "",
                userId: this.user._id

            };
            this.showing = 'mypicForm';
        };

        List.prototype.createPhotos = function createPhotos() {
            this.mypicObj = {
                galleryId: this.getgallery._id
            };
            this.showing = 'photoForm';
        };

        List.prototype.saveGallery = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                var response;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!this.myGalleryObj) {
                                    _context3.next = 5;
                                    break;
                                }

                                _context3.next = 3;
                                return this.mygallery.save(this.myGalleryObj);

                            case 3:
                                response = _context3.sent;

                                if (response.error) {
                                    alert("There was an error creating the Gallery");
                                } else {}

                            case 5:
                                this.showing = "mypicList";

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function saveGallery() {
                return _ref3.apply(this, arguments);
            }

            return saveGallery;
        }();

        List.prototype.editMyGallery = function editMyGallery(mygallery) {
            this.myGalleryObj = mygallery;
            this.showing = 'mypicForm';
        };

        List.prototype.editPhotos = function editPhotos(mypics) {
            this.mypicObj = mypics;
            this.showing = 'photoForm';
        };

        List.prototype.deleteMyGallery = function deleteMyGallery(mygallery) {
            this.mygallery.deleteMypic(mygallery._id);
        };

        List.prototype.deletePhotos = function deletePhotos(mypics) {
            this.mypics.deleteMypic(mypics._id);
        };

        List.prototype.back = function back() {
            this.showing = "mypicList";
        };

        List.prototype.backToMyGallery = function backToMyGallery() {
            this.showing = "mypicList";
        };

        List.prototype.backPhotos = function backPhotos() {
            this.showing = "photoList";
        };

        List.prototype.changeFiles = function changeFiles() {
            this.filesToUpload = new Array();
            this.filesToUpload.push(this.files[0]);
        };

        List.prototype.removeFile = function removeFile(index) {
            this.filesToUpload.splice(index, 1);
        };

        List.prototype.savePhotos = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                var response, mypicId, galleryId;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!this.mypicObj) {
                                    _context4.next = 15;
                                    break;
                                }

                                _context4.next = 3;
                                return this.mypics.savePhoto(this.mypicObj);

                            case 3:
                                response = _context4.sent;

                                if (!response.error) {
                                    _context4.next = 8;
                                    break;
                                }

                                alert("There was an error creating the Mypic");
                                _context4.next = 14;
                                break;

                            case 8:
                                mypicId = response._id;
                                galleryId = response.galleryId;

                                if (!(this.filesToUpload && this.filesToUpload.length)) {
                                    _context4.next = 14;
                                    break;
                                }

                                _context4.next = 13;
                                return this.mypics.uploadFile(this.filesToUpload, galleryId, mypicId);

                            case 13:
                                this.filesToUpload = [];

                            case 14:
                                this.showing = "photoList";

                            case 15:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function savePhotos() {
                return _ref4.apply(this, arguments);
            }

            return savePhotos;
        }();

        List.prototype.logout = function logout() {
            sessionStorage.removeItem('user');
            this.auth.logout();
        };

        return List;
    }()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./value-converters/date-format', './value-converters/completed', './elements/flatpickr']);
  }
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DataServices = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function DataServices(http) {
            var _this = this;

            _classCallCheck(this, DataServices);

            this.httpClient = http;

            this.BASE_URL = "http://localhost:5000/api/";

            this.httpClient.configure(function (config) {
                config.withBaseUrl(_this.BASE_URL).withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                }).withInterceptor({
                    request: function request(_request) {
                        console.log('Requesting ' + _request.method + ' ' + _request.url);
                        return _request;
                    },
                    response: function response(_response) {
                        console.log('Received ' + _response.status + ' ' + _response.url);
                        return _response;
                    }
                });
            });
        }

        DataServices.prototype.get = function get(url) {
            return this.httpClient.fetch(url).then(function (response) {
                return response.json();
            }).then(function (data) {
                return data;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.post = function post(content, url) {
            return this.httpClient.fetch(url, {
                method: 'post',
                body: (0, _aureliaFetchClient.json)(content)
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.put = function put(content, url) {
            return this.httpClient.fetch(url, {
                method: 'put',
                body: (0, _aureliaFetchClient.json)(content)
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.delete = function _delete(url) {
            return this.httpClient.fetch(url, {
                method: 'delete'
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
            return this.httpClient.fetch(url, {
                method: 'post',
                body: files
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        return DataServices;
    }()) || _class);
});
define('resources/data/gallery',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Mygallery = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Mygallery = exports.Mygallery = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Mygallery(data) {
            _classCallCheck(this, Mygallery);

            this.data = data;
            this.MYGALLERY_SERVICE = 'Galleries';
            this.mygalleryArray = [];
        }

        Mygallery.prototype.getUserMygallery = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.data.get(this.MYGALLERY_SERVICE + "/" + id);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.mygalleryArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUserMygallery(_x) {
                return _ref.apply(this, arguments);
            }

            return getUserMygallery;
        }();

        Mygallery.prototype.save = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(mygallery) {
                var serverResponse, _serverResponse;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!mygallery) {
                                    _context2.next = 14;
                                    break;
                                }

                                if (mygallery._id) {
                                    _context2.next = 9;
                                    break;
                                }

                                _context2.next = 4;
                                return this.data.post(mygallery, this.MYGALLERY_SERVICE);

                            case 4:
                                serverResponse = _context2.sent;

                                if (!serverResponse.error) {
                                    this.mygalleryArray.push(serverResponse);
                                }
                                return _context2.abrupt('return', serverResponse);

                            case 9:
                                _context2.next = 11;
                                return this.data.put(mygallery, this.MYGALLERY_SERVICE + "/" + mygallery._id);

                            case 11:
                                _serverResponse = _context2.sent;

                                if (!_serverResponse.error) {}
                                return _context2.abrupt('return', _serverResponse);

                            case 14:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function save(_x2) {
                return _ref2.apply(this, arguments);
            }

            return save;
        }();

        Mygallery.prototype.deleteMypic = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
                var serverResponse, i;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.data.delete(this.MYGALLERY_SERVICE + "/" + id);

                            case 2:
                                serverResponse = _context3.sent;

                                if (!serverResponse.error) {
                                    for (i = 0; i < this.mygalleryArray.length; i++) {
                                        if (this.mygalleryArray[i]._id === id) {
                                            this.mygalleryArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function deleteMypic(_x3) {
                return _ref3.apply(this, arguments);
            }

            return deleteMypic;
        }();

        return Mygallery;
    }()) || _class);
});
define('resources/data/mypics',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MyPics = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var MyPics = exports.MyPics = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function MyPics(data) {
            _classCallCheck(this, MyPics);

            this.data = data;
            this.MYPIC_SERVICE = 'mypics';
            this.mypicsArray = [];
            this.Gallery_service = 'Galleries';
        }

        MyPics.prototype.savePhoto = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(mypic) {
                var serverResponse, _serverResponse;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log(mypic);

                                if (!mypic) {
                                    _context.next = 15;
                                    break;
                                }

                                if (mypic._id) {
                                    _context.next = 10;
                                    break;
                                }

                                _context.next = 5;
                                return this.data.post(mypic, this.MYPIC_SERVICE);

                            case 5:
                                serverResponse = _context.sent;

                                if (!serverResponse.error) {
                                    this.mypicsArray.push(serverResponse);
                                }
                                return _context.abrupt('return', serverResponse);

                            case 10:
                                _context.next = 12;
                                return this.data.put(mypic, this.MYPIC_SERVICE + "/" + mypic._id);

                            case 12:
                                _serverResponse = _context.sent;

                                if (!_serverResponse.error) {}
                                return _context.abrupt('return', _serverResponse);

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function savePhoto(_x) {
                return _ref.apply(this, arguments);
            }

            return savePhoto;
        }();

        MyPics.prototype.deleteMypic = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
                var serverResponse, i;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.data.delete("Mypics" + "/" + id);

                            case 2:
                                serverResponse = _context2.sent;

                                if (!serverResponse.error) {
                                    for (i = 0; i < this.mypicsArray.length; i++) {
                                        if (this.mypicsArray[i]._id === id) {
                                            this.mypicsArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function deleteMypic(_x2) {
                return _ref2.apply(this, arguments);
            }

            return deleteMypic;
        }();

        MyPics.prototype.uploadFile = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(files, galleryId, mypicId) {
                var formData, serverResponse;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                formData = new FormData();

                                files.forEach(function (item, index) {
                                    formData.append("file" + index, item);
                                });

                                _context3.next = 4;
                                return this.data.uploadFiles(formData, this.Gallery_service + "/upload/" + galleryId + "/" + mypicId);

                            case 4:
                                serverResponse = _context3.sent;
                                return _context3.abrupt('return', serverResponse);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function uploadFile(_x3, _x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return uploadFile;
        }();

        MyPics.prototype.getUserMypics = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(galleryId) {
                var response;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.data.get("Mypics" + "/user/" + galleryId);

                            case 2:
                                response = _context4.sent;

                                if (!response.error && !response.message) {
                                    this.mypicsArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getUserMypics(_x6) {
                return _ref4.apply(this, arguments);
            }

            return getUserMypics;
        }();

        return MyPics;
    }()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Users(data) {
            _classCallCheck(this, Users);

            this.data = data;
            this.USER_SERVICE = 'users';
        }

        Users.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!user) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 3;
                                return this.data.post(user, this.USER_SERVICE);

                            case 3:
                                serverResponse = _context.sent;
                                return _context.abrupt('return', serverResponse);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Users;
    }()) || _class);
});
define('resources/elements/flatpickr',['exports', 'aurelia-framework', 'flatpickr'], function (exports, _aureliaFramework, _flatpickr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlatPickerCustomElement = undefined;

    var _flatpickr2 = _interopRequireDefault(_flatpickr);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var FlatPickerCustomElement = exports.FlatPickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function FlatPickerCustomElement(element) {
            _classCallCheck(this, FlatPickerCustomElement);

            _initDefineProp(this, 'value', _descriptor, this);

            this.element = element;
        }

        FlatPickerCustomElement.prototype.bind = function bind() {
            var defaultConfig = {
                altInput: true,
                altFormat: "F j, Y",
                wrap: true
            };
            this._config = Object.assign({}, defaultConfig);
            this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
        };

        FlatPickerCustomElement.prototype.attached = function attached() {
            this.flatpickr = new _flatpickr2.default(this.element.querySelector('.aurelia-flatpickr'), this._config);
        };

        FlatPickerCustomElement.prototype.onChange = function onChange(selectedDates, dateStr, instance) {
            this.value = selectedDates[0];
        };

        FlatPickerCustomElement.prototype.valueChanged = function valueChanged() {
            if (!this.flatpickr) {
                return;
            }
            if (this.value === this.flatpickr.selectedDates[0]) {
                return;
            }
            var newDate = this.value ? this.value : undefined;
            this.flatpickr.setDate(newDate);
        };

        return FlatPickerCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/value-converters/completed',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CompletedValueConverter = exports.CompletedValueConverter = function () {
    function CompletedValueConverter() {
      _classCallCheck(this, CompletedValueConverter);
    }

    CompletedValueConverter.prototype.toView = function toView(array, value) {
      if (!value) {
        return array.filter(function (item) {
          return !item.completed;
        });
      } else {
        return array;
      }
    };

    return CompletedValueConverter;
  }();
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
   'use strict';

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   exports.DateFormatValueConverter = undefined;

   var _moment2 = _interopRequireDefault(_moment);

   function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
         default: obj
      };
   }

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

   var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
      function DateFormatValueConverter() {
         _classCallCheck(this, DateFormatValueConverter);
      }

      DateFormatValueConverter.prototype.toView = function toView(value) {
         var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'MMM Do YYYY';

         if (value === undefined || value === null) {
            return;
         }

         return (0, _moment2.default)(value).format(format);
      };

      return DateFormatValueConverter;
   }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"resources/css/styles.css\"></require><router-view></router-view></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = ".rightMargin {\n    margin-right: 50px;\n    }\n\n    .leftMargin {\n        margin-left: 50px;\n    }\n    \n\n\n/* Add a black background color to the top navigation */\n.topnav {\n    background-color: #333;\n    overflow: hidden;\n}\n\n/* Style the links inside the navigation bar */\n.topnav a {\n    float: left;\n    color: #f2f2f2;\n    text-align: center;\n    padding: 14px 16px;\n    text-decoration: none;\n    font-size: 17px;}\n\n.topnav a.active {\n        background-color: #4CAF50;\n        color: white;\n    }\n\n\n    .btn {\n        border: none; /* Remove borders */\n        color: white; /* Add a text color */\n        padding: 14px 28px; /* Add some padding */\n        cursor: pointer; /* Add a pointer cursor on mouse-over */\n    }\n    \n    .success {background-color: #4CAF50;} /* Green */\n    .success:hover {background-color: #46a049;}\n\n\n    .textcolor {color: #b30606}\n\n/* Set all odd list items to a different color */\n    table thead:nth-child(odd) {\n        background: #4CAF50;\n    }\n    \n    .fa-trash:hover {\n        background-color: #f44336;\n        color: rgb(247, 239, 239);\n\n        \n    }\n\n    .fa-pencil:hover {\n        background-color: #4CAF50;\n        color: rgb(247, 239, 239);\n\n        \n    }\n\n    .form-check \n\n    /* When clicked on, add a background color and strike out text */\n.fa fa-check {\n    background: #888;\n    \n}\n\n.button1 {\n    background-color: #555555;\n    }\n\n\n\n\n\n    \n\n\n\n\n"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template><body><div class=\"topnav\" id=\"myTopnav\"><a class=\"active\" href=\"#home\">${message}</a></div>        <compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose>    <compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></body></template>"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template><div class=\"topnav\" id=\"myTopnav\"><a class=\"active\" href=\"#home\">${message}</a></div>         <compose show.bind=\"showing == 'mypicList'\" view=\"./components/galleryList.html\"></compose><compose show.bind=\"showing == 'mypicForm'\" view=\"./components/galleryForm.html\"></compose><compose show.bind=\"showing == 'photoList'\" view=\"./components/pictureList.html\"></compose><compose show.bind=\"showing == 'photoForm'\" view=\"./components/pictureForm.html\"></compose></template>"; });
define('text!resources/elements/flatpickr.html', ['module'], function(module) { module.exports = "<template><require from=\"flatpickr/flatpickr.css\"></require><div class=\"input-group aurelia-flatpickr\"><input type=\"text\" class=\"aurelia-flatpickr form-control flatPicker\" data-input></div></template>"; });
define('text!modules/components/galleryForm.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span><h1 style=\"font-family:chiller;text-align:center\"><b>Create a Gallery</b></h1><form><div class=\"form-group topMargin\"><label for=\"mypicInput\" style=\"color:#000;font-size:140%\"><b>Gallery Name*:</b></label><input value.bind=\"myGalleryObj.gallery\" type=\"text\" class=\"form-control\" id=\"mypicInput\" aria-describedby=\"mypicHelp\" placeholder=\"Enter Gallery Name\" style=\"color:#000;font-size:120%;font-family:chiller\"> <small id=\"mypicHelp\" class=\"form-text text-muted\" style=\"color:#000;font-size:100%;font-family:chiller\"><b>A short name for the Gallery.</b></small></div><div class=\"form-group\"><label for=\"descInput\" style=\"color:#000;font-size:140%\"><b>Description:</b></label><input value.bind=\"myGalleryObj.description\" type=\"text\" class=\"form-control\" id=\"descInput\" aria-describedby=\"descHelp\" placeholder=\"Enter Description\" style=\"color:#000;font-size:120%;font-family:chiller\"><small id=\"descHelp\" class=\"form-text text-muted\" style=\"color:#000;font-size:100%;font-family:chiller\"><b>A gallery description.</b></small></div><div class=\"form-group\"><label for=\"dateCreatedInput\" style=\"color:#000;font-size:140%\"><b>Date Created*:</b></label><flat-picker value.bind=\"myGalleryObj.dateCreated\"></flat-picker><small id=\"dateCreatedHelp\" class=\"form-text text-muted\" style=\"color:#000;font-size:100%;font-family:chiller\"><b>The gallery creation date.</b></small></div><button click.trigger=\"saveGallery()\" class=\"btn success\"><b>Save</b></button></form></div></template>"; });
define('text!modules/components/galleryList.html', ['module'], function(module) { module.exports = "<template><center><h3>Galleries!!</h3></center><div class=\"container\"><div class=\"card topMargin\"><div class=\"card-body\"><div class=\"row\"><span class=\"col\"><span class=\"rightMargin pull-right\"><button type=\"button\" class=\"btn success\" click.trigger=\"logout()\"><b>Logout</b></button></span> <span class=\"leftMargin pull-left\"><button type=\"button\" class=\"btn success\" click.trigger=\"createGallery()\"><b>Create</b></button></span></span></div><br><div show.bind=\"mygallery.mygalleryArray.length\"><table class=\"table table-striped\"><thead><tr><th bgcolor=\"#4CAF50\" style=\"text-align:center;color:#000;font-size:120%\">Gallery Name</th><th bgcolor=\"#4CAF50\" style=\"text-align:center;color:#000;font-size:120%\">Description</th><th bgcolor=\"#4CAF50\" style=\"text-align:center;color:#000;font-size:120%\">Date Created</th><th bgcolor=\"#4CAF50\" style=\"text-align:center;color:#000;font-size:120%\">Edit</th><th bgcolor=\"#4CAF50\" style=\"text-align:center;color:#000;font-size:120%\">Delete</th></tr></thead><tbody><tr class repeat.for=\"mygallery of mygallery.mygalleryArray\"><td click.trigger=\"showPhotos(mygallery)\" style=\"text-align:center;font-family:chiller;font-size:120%\">${mygallery.gallery}</td><td style=\"text-align:center;font-family:chiller;font-size:120%\">${mygallery.description}</td><td style=\"text-align:center;font-family:chiller;font-size:120%\">${mygallery.dateCreated | dateFormat}</td><td style=\"text-align:center\"><i click.trigger=\"editMyGallery(mygallery)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i></td><td><i click.trigger=\"deleteMyGallery(mygallery)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div></div><div show.bind=\"!mygallery.mygalleryArray.length\"><br><br><h2 style=\"text-align:center;color:#000;font-family:chiller\">Apparently, you don't have any Gallery</h2></div></div></div></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><div class=\"col-md-2\"><form id=\"form\"><center><div class=\"card\" style=\"width:700px\"><div class=\"card-body\"><div class=\"form-group col\"><div class=\"col-md-4 col-lg-offset-10 col-xs-offset-9\"><div class=\"form-group col\"><label for=\"email\">Login</label><input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" placeholder=\"Enter email\"></div><div class=\"form-group col\"><label for=\"password\">Password</label><input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"></div><button type=\"button\" class=\"btn success\" data-toggle=\"button\" click.trigger=\"login()\">Login</button> <a href=\"\" class=\"text-muted\" click.trigger=\"showRegister()\">Register</a><div id=\"errorMsg\" class=\"textcolor\" innerhtml.bind=\"loginError\"></div></div></div></div></div></center></form></div></template>"; });
define('text!modules/components/pictureForm.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"><h3 style=\"text-align:center;font-family:chiller;color:#000;margin-left:15px\"><b>Upload Pictures</b></h3><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"backPhotos()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div><br><br><form><div class=\"form-group topMargin\"><label for=\"mypicInput\" style=\"color:#000;font-size:140%;font-family:chiller\"><b>PictureName*:</b></label><input value.bind=\"mypicObj.picName\" type=\"text\" class=\"form-control\" id=\"mypicInputName\" aria-describedby=\"mypicHelp\" placeholder=\"Enter Photo Name\" style=\"color:#000;font-size:120%;font-family:chiller\"> <small id=\"mypicHelp\" class=\"form-text text-muted\" style=\"color:#000;font-size:100%;font-family:chiller\"><b>A short name for the Picture.</b></small></div><div class=\"form-group\"><label for=\"descInput\" style=\"color:#000;font-size:140%;font-family:chiller\"><b>Description:</b></label><input value.bind=\"mypicObj.picDescription\" type=\"text\" class=\"form-control\" id=\"mypicInputDes\" aria-describedby=\"descHelp\" placeholder=\"Enter Description\" style=\"color:#000;font-size:120%;font-family:chiller\"><small id=\"descHelp\" class=\"form-text text-muted\" style=\"color:#000;font-size:100%;font-family:chiller\"><b>A gallery description.</b></small></div><br><br><label class=\"btn success\"><b>Browse</b> <input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label><small id=\"fileHelp\" class=\"form-text text-muted\" style=\"color:#000;font-size:100%;font-family:chiller\"><b>Upload picture!!</b></small><br><ul><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\"> ${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li></ul><br><br><br><button click.trigger=\"savePhotos()\" class=\"btn success topMargin\"><b>Save</b></button><br><br></form></div></template>"; });
define('text!modules/components/pictureList.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span><h3 style=\"font-family:chiller;color:#000;text-align:center\"><b>Pictures Gallery</b></h3><div class=\"card topMargin\"><div class=\"row\"><span class=\"col\"><span class=\"rightMargin pull-right\"><button type=\"button\" class=\"btn success\" click.trigger=\"logout()\"><b>Logout</b></button></span> <span class=\"leftMargin pull-left\"><button type=\"button\" class=\"btn success\" click.trigger=\"createPhotos()\"><b>Add a Photo</b></button></span></span></div><div show.bind=\"mypics.mypicsArray.length\"><table class=\"table table-striped\"><thead><tr><br><th style=\"text-align:center;color:#000;font-size:120%;font-family:chiller\">Photos</th><th style=\"text-align:center;color:#000;font-size:120%;font-family:chiller\">Name</th><th style=\"text-align:center;color:#000;font-size:120%;font-family:chiller\">Description</th></tr></thead><tbody><tr class repeat.for=\"mypics of mypics.mypicsArray\" align=\"left\"><td><a href=\"uploads/${mypics.galleryId}/${mypics.file.filename}\" target=\"_blank\"><img src=\"uploads/${mypics.galleryId}/${mypics.file.filename}\" style=\"width:Auto;height:100px\"></a><br><i click.trigger=\"editPhotos(mypics)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"deletePhotos(mypics)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td><td style=\"text-align:center;font-family:chiller;font-size:100%\">${mypics.picName}</td><td style=\"text-align:center;font-family:chiller;font-size:100%\">${mypics.picDescription}</td></tr></tbody></table></div></div></div><div show.bind=\"!mypics.mypicsArray.length\"><br><br><h3 style=\"text-align:center;color:red\"><b>There are no pictures at the moment, please add some!!</b></h3></div></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template><center><h3>New users register below!!</h3></center><div class=\"row justify-content-md-center\"></div><form class=\"col-lg-3 col-lg-offset-.5\" id=\"RegistrationForm\"><div innerhtml.bind=\"registerError\"></div><div class=\"form-group\"><label for=\"InputFirstName\">First Name</label><input type=\"text\" class=\"form-control\" id=\"InputFirstName\" aria-describedby=\"firstNameHelp\" placeholder=\"Enter first name\" value.bind=\"user.firstName\"></div><div class=\"form-group\"><label for=\"InputLastName\">Last Name</label><input type=\"text\" class=\"form-control\" id=\"InputLastName\" aria-describedby=\"lastNameHelp\" placeholder=\"Enter last name\" value.bind=\"user.lastName\"></div><div class=\"form-group\"><label for=\"InputEmail\">Email</label><input type=\"email\" class=\"form-control\" id=\"InputEmail\" aria-describedby=\"emailHelp\" placeholder=\"Enter email\" value.bind=\"user.email\"></div><div class=\"form-group\"><label for=\"InputPassword\">Password</label><input type=\"text\" class=\"form-control\" id=\"InputPassword\" aria-describedby=\"passwordHelp\" placeholder=\"Enter password\" value.bind=\"user.password\"></div><button click.delegate=\"save()\" class=\"btn success\">Save</button></form></template>"; });
//# sourceMappingURL=app-bundle.js.map