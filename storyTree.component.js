(function(){
    var myApp = angular.module('storyApp', []);
    
    angular.module('storyApp').component('storyTree', {
        templateUrl: 'storyTree.html',
        bindings: {
            firstSentence: '@'
        },
        controller: StoryTree
    });
    
    function StoryTree() {
        var vm = this;
        
        vm.$onInit = $onInit;
        vm.addChild = addChild;
        vm.jumpToChild = jumpToChild;
        vm.returnToStart = returnToStart;
        
        function Node(data) {
            this.data = data;
            this.parent = null;
            this.children = [];
        }
        
        function $onInit() {
            vm._root = new Node(vm.firstSentence);
            vm.currentNode = this._root;
        }
        
        function addChild(childIndex) {
            var data = vm.preSaveBuffer.children[childIndex].data;
            vm.currentNode.children[childIndex] = new Node(data);
        }
        
        function jumpToChild(childIndex) {
            vm.currentNode.children[childIndex].parent = vm.currentNode;
            vm.currentNode = vm.currentNode.children[childIndex];
            vm.preSaveBuffer.children = [];
        }
        
        function returnToStart() {
            vm.currentNode = vm._root;
            if (vm.preSaveBuffer) {
                vm.preSaveBuffer.children = vm.currentNode.children;
            }
        }
    }
})();