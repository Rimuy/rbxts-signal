local Signal = {}
Signal.__index = Signal

local CLASSNAME = 'Signal'

function SignalConstructor()
	return setmetatable({
		ClassName = CLASSNAME;
		_bindable = Instance.new('BindableEvent');
	}, Signal)
end

local function IsSignal(obj)
    return (type(obj) == 'table' and getmetatable(obj) == Signal)
end

function Signal:Receive(callback)
	return self._bindable.Event:Connect(function(returnArgs)
		callback(returnArgs())
	end)
end

function Signal:Emit(...)
	local args = {...}
	local n = select('#', ...)

	self._bindable:Fire(function()
		return table.unpack(args, 1, n)
	end)
end

function Signal:Wait()
	return self._bindable.Event:Wait()()
end

function Signal:Destroy()
	self._bindable:Destroy()
end

return setmetatable({
	new = SignalConstructor,
	Is = IsSignal
}, {
	__call = SignalConstructor
})